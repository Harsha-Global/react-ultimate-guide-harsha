# Prepare the Database Catalog

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Prepare the database catalog

Completed adds the Product `category` and `image` fields, the hand-written `prisma/migrations/202610160001_catalog_contract/migration.sql` (two ALTER TABLE statements and three ID-scoped UPDATE backfills) and a seed that upserts all four catalog products. Stop `npm run dev`, then run `npm run db:generate`, `npm run db:deploy`, `npm run db:seed` and `npm run check`. The seed deliberately resets the sample inventory: run it only against the disposable local database. To inspect the rows, `npx prisma studio --browser none` prints a local address to open. The storefront still reads the sample API at this checkpoint.
