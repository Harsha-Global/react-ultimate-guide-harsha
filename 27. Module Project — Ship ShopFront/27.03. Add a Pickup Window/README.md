# Add a Pickup Window

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Completed/product-explorer: the project at the end of this lecture (shared/checkoutSchema.ts: the collectionWindow field and its pickup rule; src/CheckoutPage.tsx: its default value, the pickup select with its help and error text, and the field added to the method-change recheck; src/toFulfillment.ts: the plain CheckoutValues parameter; src/index.css: the prepared styles). Keep it for the next lecture.
- Styles: the prepared stylesheet for this lecture (copied into src/index.css in the lecture).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`.

## Try it

Add a product to the bag, open checkout as Jordan, enter sample contact details (Alex Morgan, alex@example.com), choose Studio pickup and submit without a window: the form asks for a collection window. Choose Morning to clear it. Choose Standard delivery, enter 14 Lake Road, Lakeside, 12345, switch to pickup and back: the address is still there.
