# ShopFront — pages loaded by their routes

The completed project of Optimize Storefront Interactions: the sign-in, checkout, order-history and inventory pages are loaded by their routes when they are first used, so the collection starts without them; every journey works as before.

## Run this copy

Use Node.js 24 and the supplied lockfile. Stop other ShopFront app and API processes before starting this copy. Run `npm ci`, then `npm run api`. In a second terminal in the same folder, run `npm run dev`.

Open http://127.0.0.1:5185. Check the service at http://127.0.0.1:4185/api/health. Keep the same hostname throughout the session. Use `npm run build` and `npm run lint` for the code checks, alongside the lecture's behavior checks.

Practice accounts: `jordan@example.com` (customer) and `rebecca@example.com` (staff), both with password `PracticeOnly42!`. Sessions and orders are stored in memory; restarting the service clears them. This local practice app does not collect real payments. Browser bag and delivery preferences are separate from the server's in-memory data.
