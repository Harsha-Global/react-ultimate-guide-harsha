# Final Feature Challenge

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Assignment, Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Final feature challenge

The Assignment folder contains the brief (`Assignment.md`) and the Starter project for the merchant order note challenge; Completed/shopfront-next is the unchanged guided checkpoint. Follow the Starter's Run Guide: copy the Starter into its own folder (for example C:\react\a10-attempt), give it a separate local PostgreSQL instance on an unused port with its own `shopfront_dev` and `shopfront_test` databases and a private `.env`, then run `npm ci`, `npm run db:generate`, `npm run db:deploy`, `npm run db:seed`, `npm run db:fixtures`, `npm run check` and `npm run lint`. Keep the Solution folder and its review closed until you have finished your own attempt; never apply its migration to your guided database.
