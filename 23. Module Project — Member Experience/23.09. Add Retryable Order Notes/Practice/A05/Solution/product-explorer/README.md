# ShopFront — A05 Retryable Order Notes solution

This is the separate completed assignment solution. Compare it with your own attempt after following `../../Assignment.md`; it is not a prerequisite for the next guided lecture.

Trace the controlled note draft through the form Action and protected saveOrderNote helper to the returned saved order. Verify pending feedback, the supplied first-attempt rejection for “Please leave with Jordan”, retained draft, retry success beside the correct order, invalid inputs and session expiry. Keep the guided project unchanged.

## Run this copy

Use Node.js 24 and the supplied lockfile. Stop other ShopFront app and API processes before starting this copy. Run `npm ci`, then `npm run api`. In a second terminal in the same folder, run `npm run dev`.

Open http://127.0.0.1:5185. Check the service at http://127.0.0.1:4185/api/health. Keep the same hostname throughout the session. Use `npm run build` and `npm run lint` for the code checks, alongside the lecture's behavior checks.

Practice accounts: `jordan@example.com` (customer) and `rebecca@example.com` (staff), both with password `PracticeOnly42!`. Sessions and orders are stored in memory; restarting the service clears them. This local practice app does not collect real payments. Browser bag and delivery preferences are separate from the server's in-memory data.
