# Fix an Account-Switch Cache Bug

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (the private order history).
- Completed/product-explorer: the same project at the end of the lecture: unchanged in this lecture: the guided project already keys the history by account (src/orderQueries.ts: ["private", "orders", userId]), and src/Auth.tsx's session change already cancels and removes the private queries. Keep it for the next lecture.
- Demonstrations/Private cache bug/product-explorer: the separate faulty copy used in the video, with the shared ["orders"] query key (see its README). Copy it to C:\react\product-explorer-resources\Demonstrations\Private cache bug\product-explorer, stop the main app and API, then run `npm ci`, `npm run api` and, in a second terminal, `npm run dev` there.
- Service Checks: the supplied service checks (see its README).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

In the faulty copy: sign in as Jordan, place a practice order with the Trail Backpack, and open My orders. Sign out, sign in as Rebecca, and open My orders again within a minute: Jordan's order is still shown. With DevTools open on the Network tab (filtered by orders), Rebecca's sign-in makes no new orders request. In src/orderQueries.ts change the key to ["private", "orders", userId] and save. Read src/Auth.tsx (the session change sets the checking state, cancels and removes the private queries, then shows the new session). Repeat the journey: Jordan sees his order, then Rebecca sees No orders yet. Afterwards stop the copy and continue with the completed guided project.
