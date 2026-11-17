import { get, put } from '@vercel/blob';
import { createReservationHandler } from '../server/resetguard-reservations.mjs';

const options = () => ({ access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN });
const store = {
  async read(path) {
    try {
      const result = await get(path, { ...options(), useCache: false });
      if (!result || result.statusCode === 404) return null;
      return await new Response(result.stream).json();
    } catch (error) {
      if (error?.name === 'BlobNotFoundError') return null;
      throw error;
    }
  },
  async create(path, value, extra = {}) {
    try {
      await put(path, JSON.stringify(value), { ...options(), contentType: 'application/json', addRandomSuffix: false, allowOverwrite: false, ...extra });
      return true;
    } catch (error) {
      // SDK releases report existing-path conflicts with different error types.
      // A consistent private read distinguishes a race from a failed write.
      if (await store.read(path)) return false;
      throw error;
    }
  },
};

async function send(payload, idempotencyKey) {
  for (let attempt = 0; attempt < 2; attempt++) {
    let response;
    try {
      response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESETGUARD_RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12_000),
      });
    } catch (error) {
      if (attempt === 0) continue;
      throw error;
    }
    if (response.ok) return response.json();
    if (attempt === 0 && (response.status === 429 || response.status >= 500)) {
      await new Promise((resolve) => setTimeout(resolve, 750));
      continue;
    }
    const error = new Error('Email request rejected');
    error.name = `EmailProvider${response.status}`;
    throw error;
  }
}

export default { fetch: createReservationHandler({ store, send }) };
