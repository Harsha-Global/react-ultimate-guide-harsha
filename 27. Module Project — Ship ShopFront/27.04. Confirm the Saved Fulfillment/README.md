# Confirm the Saved Fulfillment

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Completed/product-explorer: the project at the end of this lecture (shared/orderSchema.ts: the strict request with its details and the fulfillment in the order; src/orderApi.ts: the mapped orderDetails; server/orders.mjs: the delivery fee from the validated choice and the stored fulfillment; src/FulfillmentSummary.tsx, used in src/OrderConfirmation.tsx and src/OrdersPage.tsx; src/index.css: the prepared styles). Keep it for the next lecture.
- Styles: the prepared stylesheet for this lecture (copied into src/index.css in the lecture).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`.

## Try it

Restart `npm run api` after changing the server file, then sign in again as Jordan (restarting the API clears its sessions). Place a pickup order with the Morning window: the confirmation shows Studio pickup · 10 am–12 pm, and View my orders shows the same choice; reload the orders page to load it again from the running API. Try a delivery order too: its summary shows the saved method, city and postal code.
