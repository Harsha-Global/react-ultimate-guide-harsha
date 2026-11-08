# Connect Uploads & Notifications

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Connect uploads and notifications

Completed adds the live `OrderStatusFeed`, the receipt section and the private order-image `UploadPanel` with its attachment links to the owned order page, and points the demo receipt message at the storefront order address. To watch the receipt arrive, keep `npm run jobs` stopped, run `npm run demo:receipt`, open the printed order as Alex, run `npm run outbox:dispatch` (it fails while jobs are stopped), then start `npm run jobs` and dispatch again. For uploads run `npm run storage` (port 8333) in its own terminal; stop it once to see the failed upload, wait for the prompt, start it again and retry. Only the owner can open the private image.
