# ShopFront — A05 Retryable Order Notes starter

This is the assignment starter, based on the completed member experience. It already supports sign-in, checked practice orders and private history. The protected saveOrderNote helper is supplied; your task is to connect a useful note form that retains its draft after failure and updates the correct order after success.

Read `../../Assignment.md` and its acceptance checks before editing. The sample note “Please leave with Jordan” triggers the supplied first-attempt rejection before the write. Check pending feedback, retained input, retry success, invalid notes and session expiry. Keep this attempt separate from the guided project and compare with the solution only after your attempt.

## Run this copy

Use Node.js 24 and the supplied lockfile. Stop other ShopFront app and API processes before starting this copy. Run `npm ci`, then `npm run api`. In a second terminal in the same folder, run `npm run dev`.

Open http://127.0.0.1:5185. Check the service at http://127.0.0.1:4185/api/health. Keep the same hostname throughout the session. Use `npm run build` and `npm run lint` for the code checks, alongside the lecture's behavior checks.

Practice accounts: `jordan@example.com` (customer) and `rebecca@example.com` (staff), both with password `PracticeOnly42!`. Sessions and orders are stored in memory; restarting the service clears them. This local practice app does not collect real payments. Browser bag and delivery preferences are separate from the server's in-memory data.
