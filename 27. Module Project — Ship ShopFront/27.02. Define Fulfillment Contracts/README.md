# Define Fulfillment Contracts

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Completed/product-explorer: the project at the end of this lecture: shared/fulfillmentSchema.ts (a discriminated union of a strict delivery object with its method and address and a strict pickup object with its window, and the inferred Fulfillment type) and src/toFulfillment.ts (the mapper; its optional collectionWindow parameter is temporary until the form owns that field). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`.

## Try it

Run `npm run check`: the new files type-check with the existing source. The checkout still works as before; the new contract is used from the lecture that sends the selected fulfillment.
