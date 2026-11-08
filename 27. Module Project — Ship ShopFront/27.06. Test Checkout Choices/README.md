# Test Checkout Choices

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Completed/product-explorer: the project at the end of this lecture: tests/fulfillment.test.ts (a valid pickup mapped to exactly its kind and window, a missing window reported on the collectionWindow field, an empty delivery address rejected, an express delivery mapped without the old window, and a mixed request and an unknown window rejected by the fulfillment schema). Keep it for the next lecture.
- Practice: the Repair the Pickup Request exercise (Instructions.md, Starter and Solution projects). Try it before opening the Solution.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Run `npm run test:run`: fifteen tests pass (six fulfillment cases and the nine cart cases). Then run `npm run check:tests`. The server still validates every request, even though the browser uses the same schema.
