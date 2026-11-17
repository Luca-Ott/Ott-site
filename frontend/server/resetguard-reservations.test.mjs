import test from 'node:test';
import assert from 'node:assert/strict';
import { createReservationHandler, reservationIdentity } from './resetguard-reservations.mjs';

const env = { RESETGUARD_RESEND_API_KEY: 'test-only', RESETGUARD_COUPON_SECRET: 'unit-test-secret-only-000000000000000000', BLOB_READ_WRITE_TOKEN: 'test-only', VERCEL_ENV: 'production' };
const valid = { name: 'Test Person', email: 'test@example.com', platform: 'both', consent: true };
const request = (body = valid, ip = '192.0.2.1') => new Request('https://www.ott4future.com/api/resetguard-reservations', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.ott4future.com', 'x-vercel-forwarded-for': ip }, body: JSON.stringify(body) });
function fixture(overrides = {}) {
  const records = new Map(); const emails = []; const keys = [];
  const store = { read: async (key) => records.get(key) || null, create: async (key, value) => { if (records.has(key)) return false; records.set(key, value); return true; } };
  const handler = createReservationHandler({ env, store, send: async (payload, key) => { emails.push(payload); keys.push(key); return { id: 'fake-message-id' }; }, now: () => Date.UTC(2026, 10, 17, 10), log: () => {}, ...overrides });
  return { handler, records, emails, keys, store };
}

test('issues a stored 40% coupon and sends it only by email', async () => {
  const f = fixture(); const response = await f.handler(request({ ...valid, discountPercent: 99, code: 'attacker-code' }));
  assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true });
  const reservation = [...f.records.values()].find((value) => value.code);
  assert.equal(reservation.discountPercent, 40); assert.equal(reservation.status, 'reserved');
  assert.match(reservation.code, /^RG40-(?:[A-F0-9]{4}-){5}[A-F0-9]{4}$/);
  assert.equal(f.emails.length, 1); assert.ok(f.emails[0].text.includes(reservation.code));
  assert.deepEqual(f.emails[0].to, [valid.email]); assert.ok(reservation.consentAt);
});

test('repeated normalized email gets the same reservation and no duplicate email', async () => {
  const f = fixture(); await f.handler(request());
  assert.equal((await f.handler(request({ ...valid, name: 'Different name', email: ' TEST@example.com ' }, '192.0.2.2'))).status, 200);
  assert.equal(f.emails.length, 1); assert.equal([...f.records.values()].filter((value) => value.code).length, 1);
});

test('coupons differ for different emails and for isolated environments', () => {
  const first = reservationIdentity('one@example.com', env.RESETGUARD_COUPON_SECRET);
  assert.notEqual(first.code, reservationIdentity('two@example.com', env.RESETGUARD_COUPON_SECRET).code);
  assert.notEqual(first.code, reservationIdentity('one@example.com', 'separate-preview-secret-00000000000000').code);
});

test('invalid fields, consent and JSON never send email or create records', async () => {
  for (const patch of [{ name: '' }, { email: 'bad\r\n@example.com' }, { platform: 'anything' }, { consent: false }]) {
    const f = fixture(); assert.equal((await f.handler(request({ ...valid, ...patch }))).status, 400); assert.equal(f.emails.length, 0); assert.equal(f.records.size, 0);
  }
  const f = fixture(); const bad = new Request('https://www.ott4future.com/api/resetguard-reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
  assert.equal((await f.handler(bad)).status, 400);
});

test('honeypot returns a neutral response without sending', async () => {
  const f = fixture(); assert.equal((await f.handler(request({ ...valid, website: 'spam' }))).status, 200); assert.equal(f.emails.length, 0); assert.equal(f.records.size, 0);
});

test('failed delivery keeps the original coupon and can be retried', async () => {
  const records = new Map(); let time = Date.UTC(2026, 10, 17, 10); let fail = true; const payloads = [];
  const store = { read: async (key) => records.get(key) || null, create: async (key, value) => { if (records.has(key)) return false; records.set(key, value); return true; } };
  const handler = createReservationHandler({ env, store, now: () => time, log: () => {}, send: async (payload) => { payloads.push(payload); if (fail) throw new Error('fake provider failure'); return { id: 'ok' }; } });
  assert.equal((await handler(request())).status, 503); const code = [...records.values()].find((record) => record.code).code;
  fail = false; time += 61_000;
  assert.equal((await handler(request({ ...valid, name: 'Changed name' }))).status, 200);
  assert.equal([...records.values()].find((record) => record.code).code, code); assert.deepEqual(payloads[0], payloads[1]);
});

test('submission rate is limited without writing raw IP addresses', async () => {
  const f = fixture(); await f.handler(request());
  const result = await f.handler(request({ ...valid, email: 'other@example.com' }));
  assert.equal(result.status, 429); assert.equal(result.headers.get('Retry-After'), '60');
  assert.ok(!JSON.stringify([...f.records]).includes('192.0.2.1'));
});

test('preview is isolated and cannot send to customer addresses', async () => {
  const f = fixture({ env: { ...env, VERCEL_ENV: 'preview' } });
  assert.equal((await f.handler(request())).status, 400);
  assert.equal((await f.handler(request({ ...valid, email: 'delivered@resend.dev' }))).status, 200);
  assert.ok([...f.records.keys()].every((key) => key.startsWith('resetguard/preview/')));
});

test('health checks and missing configuration do not create reservations', async () => {
  const f = fixture(); const health = await f.handler(new Request('https://www.ott4future.com/api/resetguard-reservations'));
  assert.equal(health.status, 200); assert.equal(f.records.size, 0); assert.equal(f.emails.length, 0);
  const unavailable = fixture({ env: {} }); assert.equal((await unavailable.handler(request())).status, 503);
});

test('unexpected origins and oversized input are rejected before storage', async () => {
  const f = fixture(); const crossOrigin = new Request(request(), { headers: { 'Content-Type': 'application/json', Origin: 'https://example.org' } });
  assert.equal((await f.handler(crossOrigin)).status, 403);
  assert.equal((await f.handler(request({ ...valid, name: 'x'.repeat(5000) }))).status, 413);
  assert.equal(f.records.size, 0);
});

test('email HTML escapes submitted names', async () => {
  const f = fixture(); await f.handler(request({ ...valid, name: '<img src=x onerror=alert(1)>' }));
  assert.ok(f.emails[0].html.includes('&lt;img')); assert.ok(!f.emails[0].html.includes('<img src=x'));
});
