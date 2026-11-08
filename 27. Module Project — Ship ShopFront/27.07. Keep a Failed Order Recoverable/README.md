# Keep a Failed Order Recoverable

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Support Files: tests/checkout-recovery.test.tsx, the prepared regression test copied into the project's tests folder in the lecture.
- Completed/product-explorer: the project at the end of this lecture (the checkout page unchanged: it clears the bag only after the confirmed order; the new test keeps the bag and details after a failed request and checks that the retry sends the same request ID and the same two items). Keep it for the next lecture.
- Demonstration/Broken/product-explorer: a deliberately broken copy that clears the bag before the order response (its README explains it). Run it from its own folder; never copy its CheckoutPage into the main project.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

In Demonstration/Broken/product-explorer run `npm ci`, then `npm run test:run -- tests/checkout-recovery.test.tsx`: the test fails where the checkout summary should still show two items. In the Completed project run the same command (it passes), then `npm run test:run`: all sixteen tests pass. The test needs no API or browser server.
