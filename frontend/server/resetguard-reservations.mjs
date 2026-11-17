import { createHmac, randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';

const ORIGINS = new Set(['https://www.ott4future.com', 'https://ott4future.com']);
const CONSENT_VERSION = 'resetguard-reservation-v1';
const DAY = 86_400_000;
const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function reservationIdentity(email, secret) {
  const id = createHmac('sha256', secret).update(`resetguard-email-v1:${email}`).digest('hex');
  const code = createHmac('sha256', secret).update(`resetguard-discount40-v1:${email}`).digest('hex').slice(0, 24).toUpperCase().match(/.{4}/g).join('-');
  return { id, code: `RG40-${code}` };
}

export function reservationEmail(record, sender) {
  const name = escape(record.name);
  const code = escape(record.code);
  return {
    from: sender,
    to: [record.email],
    reply_to: 'info@ott4future.com',
    subject: 'Your ResetGuard reservation and personal 40% discount code',
    text: `Hi ${record.name},\n\nYour ResetGuard reservation is confirmed.\n\nYour personal code: ${record.code}\n\nThis code entitles you to 40% off the published ResetGuard list price at launch. Keep this email and use the same email address when claiming your discount. Redemption instructions will be provided when the app launches.\n\nResetGuard is coming soon for Android and iOS. No payment has been taken.\n\nView ResetGuard: https://www.ott4future.com/resetguard\nQuestions: info@ott4future.com\n\nOn Time Technology Ltd\nThe Black Church, St Mary's Place, Dublin D07 P4AX, Ireland`,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your ResetGuard reservation</title></head><body style="margin:0;background:#eef3fb;font-family:Arial,Helvetica,sans-serif;color:#102958"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff;border-radius:16px"><tr><td style="padding:32px"><img src="https://www.ott4future.com/resetguard-logo.webp" width="64" height="64" alt="ResetGuard" style="border-radius:14px"><p style="color:#3159a8;font-size:12px;letter-spacing:2px;font-weight:bold">ANDROID &amp; IOS · COMING SOON</p><h1 style="font-size:28px;line-height:36px">Your ResetGuard reservation is confirmed.</h1><p style="font-size:16px;line-height:26px">Hi ${name},</p><p style="font-size:16px;line-height:26px">Thank you for reserving ResetGuard. Here is your personal discount code:</p><div style="background:#071b4d;border-radius:12px;padding:24px;text-align:center"><p style="margin:0 0 12px;color:#7ddcff;font-size:22px;font-weight:bold">40% OFF THE LIST PRICE</p><p style="margin:0;color:#fff;font-family:monospace;font-size:18px;line-height:28px;word-break:break-word">${code}</p></div><p style="font-size:16px;line-height:26px">This code entitles you to <strong>40% off the published ResetGuard list price at launch</strong>. Keep this email and use the same email address when claiming your discount. Redemption instructions will be provided when the app launches.</p><p style="font-size:14px;line-height:24px">ResetGuard is coming soon for Android and iOS. No payment has been taken.</p><p style="margin:28px 0"><a href="https://www.ott4future.com/resetguard" style="background:#2330f1;color:#fff;text-decoration:none;border-radius:24px;padding:13px 22px;display:inline-block;font-weight:bold">Explore ResetGuard</a></p><p style="font-size:14px;line-height:23px">Questions? <a href="mailto:info@ott4future.com">Contact our team</a>.</p><hr style="border:0;border-top:1px solid #e1e7f1;margin:28px 0"><p style="font-size:12px;line-height:20px;color:#63738e">On Time Technology Ltd<br>The Black Church, St Mary's Place, Dublin D07 P4AX, Ireland<br>This confirmation was requested through the ResetGuard reservation form.</p></td></tr></table></td></tr></table></body></html>`,
    tags: [{ name: 'product', value: 'resetguard' }, { name: 'event', value: 'prelaunch_reservation' }],
  };
}

export function createReservationHandler({ store, env = process.env, send, now = () => Date.now(), log = console.error }) {
  return async function handle(request) {
    const configured = Boolean(env.RESETGUARD_RESEND_API_KEY && env.RESETGUARD_COUPON_SECRET?.length >= 32 && env.BLOB_READ_WRITE_TOKEN);
    if (request.method === 'GET') return json({ service: 'resetguard-reservations', ready: configured }, configured ? 200 : 503);
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, { Allow: 'GET, POST' });
    if (!configured) return json({ error: 'Reservations are temporarily unavailable. Please try again later.' }, 503);

    const origin = request.headers.get('origin');
    const previewOrigin = env.VERCEL_ENV !== 'production' && env.VERCEL_URL ? `https://${env.VERCEL_URL}` : null;
    if (origin && !ORIGINS.has(origin) && origin !== previewOrigin) return json({ error: 'Request origin is not allowed.' }, 403);
    if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Send the reservation as JSON.' }, 415);
    if (Number(request.headers.get('content-length') || 0) > 4096) return json({ error: 'The form is too large.' }, 413);

    let input;
    try {
      const raw = await request.text();
      if (Buffer.byteLength(raw) > 4096) return json({ error: 'The form is too large.' }, 413);
      input = JSON.parse(raw);
    } catch { return json({ error: 'Invalid reservation data.' }, 400); }
    if (!input || typeof input !== 'object' || Array.isArray(input)) return json({ error: 'Invalid reservation data.' }, 400);
    if (input.website) return json({ ok: true });

    const name = typeof input.name === 'string' ? input.name.trim() : '';
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    const platform = input.platform;
    if (!name || name.length > 80 || /[\x00-\x1f\x7f]/.test(name)) return json({ error: 'Please enter your name (up to 80 characters).' }, 400);
    if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);
    if (!['android', 'ios', 'both'].includes(platform)) return json({ error: 'Please choose Android, iOS or both.' }, 400);
    if (input.consent !== true) return json({ error: 'Please agree to receive your reservation confirmation and launch-offer details.' }, 400);

    const namespace = env.VERCEL_ENV === 'production' ? 'production' : 'preview';
    if (namespace === 'preview' && !email.endsWith('@resend.dev')) return json({ error: 'This preview only accepts the email provider’s test addresses.' }, 400);
    const time = now();
    const timestamp = new Date(time).toISOString();
    const { id, code } = reservationIdentity(email, env.RESETGUARD_COUPON_SECRET);
    const base = `resetguard/${namespace}`;
    const recordPath = `${base}/reservations/${id}.json`;
    const dayKey = Math.floor(time / DAY);
    const receiptPath = `${base}/delivery/${id}/${dayKey}.json`;

    try {
      // Never reveal whether an address is already registered, or return its coupon to the browser.
      if (await store.read(receiptPath)) return json({ ok: true });
      const ip = (request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
      const ipHash = createHmac('sha256', env.RESETGUARD_COUPON_SECRET).update(`rate:${ip}`).digest('hex');
      const ratePath = `${base}/rate/${Math.floor(time / 60_000)}/${ipHash}.json`;
      if (!await store.create(ratePath, { at: timestamp }, { ttlDays: 2 })) return json({ error: 'Please wait one minute before submitting another reservation.' }, 429, { 'Retry-After': '60' });

      let record = await store.read(recordPath);
      if (!record) {
        const candidate = {
          version: 1, id, name, email, platform, code, discountPercent: 40,
          discountBasis: 'published_resetguard_list_price', status: 'reserved',
          createdAt: timestamp, consentAt: timestamp, consentVersion: CONSENT_VERSION,
          purpose: 'reservation_confirmation_and_launch_offer', environment: namespace,
          emailFrom: env.RESETGUARD_EMAIL_FROM || 'ResetGuard <info@ott4future.com>',
        };
        if (await store.create(recordPath, candidate)) record = candidate;
        else record = await store.read(recordPath);
      }
      if (!record) throw new Error('reservation_storage_unavailable');

      const idempotencyKey = `resetguard-reservation/${id}/${dayKey}`;
      const result = await send(reservationEmail(record, record.emailFrom), idempotencyKey);
      if (!result?.id) throw new Error('email_not_accepted');
      await store.create(receiptPath, { emailId: result.id, acceptedAt: timestamp, reservationId: id });
      return json({ ok: true });
    } catch (error) {
      // Keep personal data, credentials, codes and upstream response bodies out of logs.
      log('ResetGuard reservation processing failed', { category: error?.name || 'Error', requestId: randomUUID() });
      return json({ error: 'We could not send your code. Please try again shortly; your reservation will keep the same code.' }, 503);
    }
  };
}
