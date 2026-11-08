# Filter the Fulfillment Queue

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Client Designs, Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Filter the fulfillment queue

Completed adds `lib/fulfillmentFilter.ts` (the supported filter values and a reader that turns a missing, unknown or repeated `status` value into `all`), a status condition in the merchant order query that only narrows the authorized result (awaiting payment = pending orders; ready or dispatched = this workspace's fulfillment record with that status), and a native GET filter form on the workspace page. Run `npm run dev`, then try each filter, reload, Clear, Back/Forward, an unknown value and another team's workspace address.
