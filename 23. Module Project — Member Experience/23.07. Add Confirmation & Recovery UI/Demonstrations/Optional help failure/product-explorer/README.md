# ShopFront — optional-help failure example

This isolated demonstration deliberately throws during DeliveryHelp rendering. It tests the local error boundary inside the delivery dialog; the saved order must remain confirmed, and the close control must remain available.

Place a practice order, open Delivery information, inspect the help-unavailable message, then close the dialog and check the unchanged confirmation. This is a rendering-failure fixture, not a failed purchase or a simulated network timeout. Keep it separate from the completed guided project.

## Run this copy

Use Node.js 24 and the supplied lockfile. Stop other ShopFront app and API processes before starting this copy. Run `npm ci`, then `npm run api`. In a second terminal in the same folder, run `npm run dev`.

Open http://127.0.0.1:5185. Check the service at http://127.0.0.1:4185/api/health. Keep the same hostname throughout the session. Use `npm run build` and `npm run lint` for the code checks, alongside the lecture's behavior checks.

Practice accounts: `jordan@example.com` (customer) and `rebecca@example.com` (staff), both with password `PracticeOnly42!`. Sessions and orders are stored in memory; restarting the service clears them. This local practice app does not collect real payments. Browser bag and delivery preferences are separate from the server's in-memory data.
