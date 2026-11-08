# Test Failures & Isolation

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Support Files contains the supplied helpers used in this lecture:

- `tests/fulfillment.integration.ts`

Also included: Bug Lab, Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Test failures and isolation

Bug Lab contains the replay exercise: copy its Starter files into a temporary `bug-lab` folder in the project, run `node bug-lab/replay.mjs` to see the duplicate fulfillment, add the unique constraint and the `ON CONFLICT ... DO NOTHING` insert (Bug Lab/Solution shows the result), run it again, then delete only that temporary folder. Completed finishes `tests/fulfillment.integration.ts` from the supplied scaffold (replayed, distinct and concurrent events, two workspaces, an independent order and the outbox count) and adds the `test:fulfillment` script. With the app and API stopped run `npm run test:fulfillment`, `npm run test:merchant`, `npm run test:orders`, `npm run test:payments`, `npm run test:receipts` and `npm run test:browser -- tests/browser/purchase-recovery.spec.ts`.
