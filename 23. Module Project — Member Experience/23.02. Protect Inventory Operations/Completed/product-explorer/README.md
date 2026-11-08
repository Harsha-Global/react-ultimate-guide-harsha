# ShopFront — staff inventory

The completed project of Protect Inventory Operations: the Inventory link only for staff, the inventory routes behind the session and staff guards, protected writes sent with the session's request-protection token, and the supplied API's staff rule in server/index.mjs.

Checkout still prepares a local draft at this stage. Saved practice orders are connected in a later lecture.

## Run this copy

Use Node.js 24 and the supplied lockfile. Stop other ShopFront app and API processes before starting this copy. Run `npm ci`, then `npm run api`. In a second terminal in the same folder, run `npm run dev`.

Open http://127.0.0.1:5185. Check the service at http://127.0.0.1:4185/api/health. Keep the same hostname throughout the session. Use `npm run build` and `npm run lint` for the code checks, alongside the lecture's behavior checks.

Practice accounts: `jordan@example.com` (customer) and `rebecca@example.com` (staff), both with password `PracticeOnly42!`. Sessions and orders are stored in memory; restarting the service clears them. This local practice app does not collect real payments. Browser bag and delivery preferences are separate from the server's in-memory data.
