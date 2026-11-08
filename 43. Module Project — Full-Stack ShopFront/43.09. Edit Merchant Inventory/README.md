# Edit Merchant Inventory

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Edit merchant inventory

Completed adds the client `MerchantStockForm` (a controlled whole-number input that sends the shown stock as `expectedStock` with the new value, keeps the draft after a rejected or unconfirmed save, and refreshes the route only after a confirmed save) and renders it in each product card only when the workspace role can edit; viewers see the stock as view only. Run `npm run dev`, change a stock value as Alex, then try an older page, a viewer and an interrupted request.
