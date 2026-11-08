# Protect Inventory Operations

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (sessions connected to checkout).
- Completed/product-explorer: the same project at the end of the lecture: src/App.tsx shows the Inventory link only for an authenticated session whose role is admin; src/router.tsx puts the inventory list, editor and delete routes inside a RequireSession route and a RequireAdmin route; src/api.ts builds the request headers and, for every method other than GET, adds the session's X-CSRF-Token from writeHeaders(); server/index.mjs is the supplied API with the staff rule for product writes and image uploads. Keep it for the next lecture.
- Supplied/Staff rule/server/index.mjs: the supplied API with the staff rule, already copied into product-explorer/server in the Completed project; copy it over product-explorer/server/index.mjs when you start from the Starter, then restart `npm run api`.
- Service Checks: the supplied service checks (see its README). With the API running, run `node check.mjs permissions` in that folder.
- Practice/C31 - Check the Staff Permission: the coding exercise (Instructions, Hints, the Starter and Solution projects and the solution explanation; see its README).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Sign in as Jordan: the header has no Inventory link. Open http://127.0.0.1:5185/inventory directly: A staff account is required, and Jordan stays signed in. In the Service Checks folder run `node check.mjs permissions`: anonymous 401, customer 403, staff 200, and the product unchanged. Sign out and sign in as Rebecca: the Inventory link appears. Edit the Trail Backpack, change its price and save: the new price shows in the inventory, the collection and the product page. Then try a one-letter name and save: Use at least two characters. Restore the sample catalog afterwards with `npm run api:reset` (with the API stopped).
