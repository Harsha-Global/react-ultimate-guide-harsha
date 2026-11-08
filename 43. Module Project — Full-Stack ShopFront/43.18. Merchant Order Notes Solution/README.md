# Merchant Order Notes Solution

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Assignment, Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Merchant order notes solution

The Assignment folder's Solution is the reference implementation reviewed in this lecture (`Solution Review.md` explains it); Completed/shopfront-next is the unchanged guided checkpoint. Copy the Solution into its own folder (for example C:\react\a10-reference) with its own local PostgreSQL instance, port and private `.env`, run `npm ci`, `npm run db:deploy` (it adds the merchant order notes migration only there), `npm run db:generate`, `npm run db:seed` and `npm run db:fixtures`. With nothing else on port 3000 run `npm run test:merchant-notes` and `node scripts/test-server.mjs tests/merchant-note.browser.mjs`, then `npm run dev` and try the notes as Alex, a viewer and a second editor tab.
