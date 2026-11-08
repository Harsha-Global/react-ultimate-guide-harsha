# Build Order History

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (practice orders placed from checkout).
- Completed/product-explorer: the same project at the end of the lecture: src/orderApi.ts adds getOrders(userId, signal): a GET to /orders through requestJson, the response checked with a result schema (userId and an items array of orders) and rejected when it or any order belongs to another user; src/orderQueries.ts adds ordersOptions(userId) with the private key ["private", "orders", userId], the query signal, a one-minute stale time and retry false; src/OrdersPage.tsx renders the signed-in customer's history through OrderHistory (keyed by the user id) with the loading, error (Try again, disabled while fetching), empty and expired-session states and an order card per saved order; src/router.tsx adds the orders route inside the session guard; src/App.tsx shows My orders for a signed-in customer; src/CheckoutPage.tsx invalidates the history after a confirmed order and links the confirmation to View my orders. Keep it for the next lecture.
- Service Checks: the supplied service checks (see its README), with the browser session-expiry note for the orders page.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Sign in as Jordan, add the Trail Backpack to your bag, open checkout, choose Studio pickup and place the practice order, then choose View my orders: the order card shows the same reference, Trail Backpack × 1 and $79.00. Sign out and sign in as Rebecca: My orders shows No orders yet, with Explore the collection. Sign in as Jordan again, stop the API (Ctrl+C in its terminal) and return to the orders page after its one-minute fresh period: We couldn't load your latest orders, with Try again, while the earlier card stays. Restart the API and choose Try again: the restarted service has no saved session or orders, so sign in again; the list is empty. To check an expired session while keeping the orders, open http://127.0.0.1:5185/session-check.html in a second tab, choose Expire this browser session, then return to the orders page after its fresh period: the page leaves the cards and returns to sign-in (Your session has ended).
