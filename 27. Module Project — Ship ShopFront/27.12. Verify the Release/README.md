# Verify the Release

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Verification/check-hosted.mjs: the hosted request checks (pages, missing files, the signed-out orders request, the Secure, HttpOnly and SameSite session cookie, the origin and request-token checks and the member-versus-staff permission). Set its `base` constant to your own service's https origin (no trailing slash), then run `node check-hosted.mjs` in a terminal opened in the Verification folder.
- Completed/product-explorer: the released source (this lecture changes no project files).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

On your hosted address: add the Trail Backpack, review checkout signed out (the sign-in page returns you to checkout), sign in with the sample member, choose studio pickup, try placing the order without a window (the missing-choice message), choose Morning and place it; check the confirmation, View my orders, then reload the history. Sign out and open /orders (sign-in is required); open /products/p999 (the missing-product message and its way back). Then run the hosted checks; both success lines must print. A free instance can respond slowly after sleeping, and a restart clears its in-memory orders.
