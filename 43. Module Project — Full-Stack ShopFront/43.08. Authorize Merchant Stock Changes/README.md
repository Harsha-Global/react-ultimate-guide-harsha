# Authorize Merchant Stock Changes

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Support Files contains the supplied helpers used in this lecture:

- `tests/merchant-stock.integration.mjs`

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Authorize merchant stock changes

Completed adds `changeMerchantStock` to `lib/merchant.ts` (one conditional update: the product, its workspace, the expected stock and an owner or editor membership of the current user; anything other than one changed row is a 409), the `PATCH /api/merchant/[workspaceId]/products/[productId]` route (same-origin check, strict whole-number input, success-only catalog tag expiry, private no-store response) and `tests/merchant-stock.integration.mjs` with the `test:merchant-stock` script. With the development server stopped, run `npm run test:merchant-stock`.
