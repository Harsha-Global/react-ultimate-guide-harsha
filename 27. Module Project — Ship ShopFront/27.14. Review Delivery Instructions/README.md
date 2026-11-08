# Review Delivery Instructions

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer and Completed/product-explorer: the released ShopFront project (the review runs the separate solution copy; the guided project is unchanged).
- The reviewed solution: Practice/A06/Solution/product-explorer in the previous lecture's resources. In the lecture it is copied to its own folder (for example C:\react\shopfront-delivery-instructions\product-explorer), installed with `npm ci` and checked there.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

In your copy of the solution, stop any running ShopFront servers, then run `npm run test:run` (23 tests), `npm run check:tests`, `npm run build`, `npm run verify:production` and `npm run test:production` (3 browser journeys). For a negative control, use another copy, remove the instruction from the mapper and watch the focused test fail; the solution itself stays unchanged.
