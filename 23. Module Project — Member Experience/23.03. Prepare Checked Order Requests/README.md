# Prepare Checked Order Requests

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (the inventory protected for staff).
- Completed/product-explorer: the same project at the end of the lecture: src/orderApi.ts adds placeOrder(details, cart, requestId, userId): it sends the checkout details, the cart lines and the request ID as a protected POST to /orders through requestJson with writeHeaders(), checks the response with orderSchema.parse, and throws an account-changed error when the order's userId is not the expected user; the supplied order service is in the project (server/orders.mjs, server/index.mjs with the orders route, shared/orderSchema.ts). The checkout page still prepares a draft: the form is connected in the next lecture. Keep it for the next lecture.
- Supplied/Order service: the supplied order service (server/orders.mjs, server/index.mjs and shared/orderSchema.ts), already copied into product-explorer in the Completed project; copy its server and shared folders into product-explorer when you start from the Starter (replace server/index.mjs), then restart `npm run api`.
- Service Checks: the supplied service checks (see its README). With the API running, run `node check.mjs repeat-order` in that folder.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Read shared/orderSchema.ts (the request adds a requestId to the checkout request; the response is the saved order), src/orderApi.ts and server/orders.mjs (the lookup key joins the user and the request ID; a repeat with the same details returns the original order, changed details return 409). With the API running, run `node check.mjs repeat-order` in the Service Checks folder: PASS, with the reference of the one saved order (the first request creates it, the repeat returns the same order). The order is kept in the API's memory, so restarting the API clears it. In the browser, checkout still prepares a draft (Prepare checkout): no order is placed from the page yet.
