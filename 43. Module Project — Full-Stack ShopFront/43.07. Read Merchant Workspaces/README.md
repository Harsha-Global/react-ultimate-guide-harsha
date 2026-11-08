# Read Merchant Workspaces

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Support Files contains the supplied helpers used in this lecture:

- `app/shopfront-release.css`

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Read merchant workspaces

Completed adds `lib/merchant.ts` (the signed-in user's workspaces, a membership check by workspace and user, and a read that returns only that workspace's products and its own items and fulfillment status from each order) and the read-only `/merchant` and `/merchant/[workspaceId]` pages with loading states, private metadata, the account link and the supplied `app/shopfront-release.css`. Run `npm run dev`, then compare Alex in Studio, Bob in Travel, a direct address to the other team and an account without a membership.
