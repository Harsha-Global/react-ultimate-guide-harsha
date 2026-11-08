# Dispatch Merchant Orders

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Support Files contains the supplied helpers used in this lecture:

- `tests/merchant.integration.mjs`

Also included: Demonstrations, Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Dispatch merchant orders

Completed adds `POST /api/merchant/[workspaceId]/orders/[orderId]/dispatch` (same-origin check, one conditional update of this workspace's ready fulfillment on a paid order for an owner or editor; anything else is a 409; private no-store response), the client `DispatchButton` (busy state, kept message on a failed or uncertain request, route refresh only after a confirmed dispatch) on the merchant workspace page, and completes `tests/merchant.integration.mjs` with the `test:merchant` script. Demonstrations contains the temporary `merchant-demo.ts` helper: copy it to `scripts`, run `node --conditions=react-server --import tsx scripts/merchant-demo.ts prepare` against your disposable local database, dispatch the demo order as Alex, then run the same command with `clean` and delete the helper. With the development server stopped, run `npm run test:merchant`.
