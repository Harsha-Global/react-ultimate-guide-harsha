# ShopFront — faulty account-switch example

This isolated demonstration deliberately uses the shared `['orders']` query key. It can reuse the previous customer's fresh cached order list after an account change. Keep it separate from the completed guided project.

Sign in as Jordan, place a practice order, and visit My orders. Sign out, sign in as Rebecca, and revisit My orders within the one-minute stale time. Investigate the cached result and lack of a new request. Restore `['private', 'orders', userId]`, inspect the existing private-query cleanup in AuthProvider, and repeat the same journey. Also check switching while a request is pending. Follow the video for the sequence; after the experiment, continue with the completed guided project.

## Run this copy

Use Node.js 24 and the supplied lockfile. Stop other ShopFront app and API processes before starting this copy. Run `npm ci`, then `npm run api`. In a second terminal in the same folder, run `npm run dev`.

Open http://127.0.0.1:5185. Check the service at http://127.0.0.1:4185/api/health. Keep the same hostname throughout the session. Use `npm run build` and `npm run lint` for the code checks, alongside the lecture's behavior checks.

Practice accounts: `jordan@example.com` (customer) and `rebecca@example.com` (staff), both with password `PracticeOnly42!`. Sessions and orders are stored in memory; restarting the service clears them. This local practice app does not collect real payments. Browser bag and delivery preferences are separate from the server's in-memory data.
