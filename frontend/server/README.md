# ResetGuard launch reservations

`POST /api/resetguard-reservations` records a reservation in a private Vercel Blob store and sends the customer a personal code for 40% off the published ResetGuard list price. It does not charge the customer or activate an app subscription.

Required server-only environment variables:

- `BLOB_READ_WRITE_TOKEN`: private reservation storage.
- `RESETGUARD_RESEND_API_KEY`: sending-only Resend key restricted to the verified `ott4future.com` domain.
- `RESETGUARD_COUPON_SECRET`: at least 32 characters; use separate production and preview values and preserve the production value so existing reservation identifiers remain stable.
- `RESETGUARD_EMAIL_FROM`: verified sender, e.g. `ResetGuard <info@ott4future.com>`.

Production and preview records have separate prefixes. Preview requests only accept Resend's test email addresses. Personal details, provider response bodies and coupon values are not logged or returned by the endpoint. Codes are delivered to the requested email address.

Reservations are immutable and unique per normalized email. The server fixes the discount at 40%; client-supplied codes, amounts and percentages are ignored. Retries reuse the original reservation, code and email payload. A daily provider idempotency key and durable delivery receipt prevent duplicate sends. Per-IP submission slots expire automatically after two days. The stored consent covers the reservation confirmation and launch-offer details only.

At launch, the purchasing backend must look up the stored reservation using the same normalized email and production secret, validate the issued code, apply 40% to its server-side published list price and record redemption atomically in its billing database. App Store / Google Play offer redemption must use their supported purchase mechanisms. The prelaunch endpoint does not implement checkout or claim that arbitrary website codes can be entered directly into the app stores.

Run the isolated service tests with `node --test server/resetguard-reservations.test.mjs`. They use in-memory storage and a fake sender; no real emails are sent.
