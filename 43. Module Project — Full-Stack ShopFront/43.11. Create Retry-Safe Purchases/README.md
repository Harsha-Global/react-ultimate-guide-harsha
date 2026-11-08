# Create Retry-Safe Purchases

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Support Files contains the supplied helpers used in this lecture:

- `tests/browser/purchase-recovery.spec.ts`

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Create retry-safe purchases

Completed adds the client `StorePurchase` component on the product page (a per-user, per-product purchase attempt kept in session storage before the request, retried with the same request key after an uncertain result, released only after a confirmed 400/409), expires the database catalog after a confirmed order write, updates the sandbox wording and adds the controlled browser scenario `tests/browser/purchase-recovery.spec.ts`. With the normal app and API stopped, run `npm run test:browser -- tests/browser/purchase-recovery.spec.ts`.
