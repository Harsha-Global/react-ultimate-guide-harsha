# Connect Verified Fulfillment

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Demonstrations, Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Connect verified fulfillment

Completed renders the existing `CheckoutButton` on a pending owned order, with the pending and verified payment messages, points the checkout success and cancellation addresses at the storefront order page (`lib/checkout.ts`) and adds `lib/fulfillment.ts`: `ensureFulfillments` removes duplicate workspace IDs with a Set and creates one row per order and workspace with `skipDuplicates`, inside the verified payment transaction in `lib/paymentReconciliation.ts`. Demonstrations contains the temporary preview check: copy it into `tests`, stop `npm run dev`, run `node scripts/test-database.mjs tests/fulfillment-preview.integration.ts` against your separate `shopfront_test` database, then delete the copy again. It uses controlled verified-session values and never contacts Stripe; the hosted test checkout needs your own Stripe test-mode key in the private `.env`.
