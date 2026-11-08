# Model Merchant Ownership

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Support Files contains the supplied helpers used in this lecture:

- `tests/input.integration.mjs.diff`
- `tests/orders.integration.mjs.diff`
- `tests/stock-race.integration.mjs.diff`

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Model merchant ownership

Completed assigns every product to a merchant workspace and adds the `Fulfillment` model (one row per order and workspace, composite key `orderId` + `workspaceId`, status `ready` or `dispatched`) with the `202610160002_merchant_scope` migration. The seed assigns Studio W-1 and Travel W-2, the public catalog skips unassigned products and order creation rejects them early. Run `npm run db:generate`, `npm run db:deploy`, `npm run db:seed` and `npm run db:fixtures`, then `npm run test:input`, `npm run test:orders` and `npm run test:stock`.
