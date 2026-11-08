# Optimize Storefront Interactions

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (the confirmation component with its optional delivery help).
- Completed/product-explorer: the same project at the end of the lecture: src/router.tsx loads the sign-in, checkout, order-history, inventory-list and inventory-editor page components only when their routes are used: each of those routes has lazy: async () => ({ Component: (await import("./PageName")).default }) in place of its Component property, and their five direct imports are removed; every route keeps its path, loader, action, shouldRevalidate, guards and error boundary, and the shared layout and the first page (App, Catalog, ProductPage, CartPage) stay directly imported. Keep it for the next lecture.
- Service Checks: the supplied service checks (see its README).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Compare the two versions with production builds. In the Starter run `npm run build`: one large JavaScript file (with a warning about chunks larger than 500 kB). In the Completed project run `npm run build`: the page components have their own files (LoginPage, CheckoutPage, OrdersPage, Inventory, ProductEditor), next to the shared files. Then run `npm run preview` (with the API running) and open http://127.0.0.1:5185 with DevTools open on the Network tab (JS filter, Disable cache) and reload: the collection requests only the shared files. Sign in as Rebecca and open Inventory, then Edit Trail Backpack: each page file is requested on its first visit. Open http://127.0.0.1:5185/orders and http://127.0.0.1:5185/checkout directly: both pages load. With the 3G throttling preset, a page that has not loaded yet shows Updating your view... at the top right while it downloads (src/App.tsx, the navigation status). Set throttling back to No throttling afterwards; file names and sizes vary between builds.
