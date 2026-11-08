# Deploy & Observe ShopFront

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Support Files contains the supplied helpers used in this lecture:

- `scripts/check-local-release.mjs`

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Deploy and observe ShopFront

Resources contains the release runbook and the pre-release inventory query. Stop `npm run dev` and `npm run api` (the release launcher owns port 5211), then run `npm run release:check`, `npm run db:generate`, `npm run db:deploy`, `npm run check`, `npm run lint` and `npm run release:build`, and keep `npm run release:start` running. Support Files contains `scripts/check-local-release.mjs`: copy it into `scripts` and run `node scripts/check-local-release.mjs --headed` against that running production build. Do not run `npm run test:browser` beside `release:start`. Hosted database, storage, job, mail, payment-notification and monitoring checks stay pending rows in the runbook until you perform them in your own hosted accounts.
