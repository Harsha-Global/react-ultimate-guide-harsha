# Protect Cart Rules

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Support Files: the prepared test setup copied into the project in the lecture (package.json and package-lock.json with the test scripts and locked test dependencies, vitest.config.ts, tsconfig.test.json, tests/setup.ts). Copy the folder's contents into your project folder (where package.json is), keeping the folder structure and replacing the matching files, then run `npm ci`.
- Completed/product-explorer: the project at the end of this lecture: the test setup and tests/cart.test.ts (an addition below the limit without changing the frozen previous line, the exact limit, five invalid quantities with it.each, an unavailable product and a removal). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Run `npm run test:run`: nine tests pass (two additions, five invalid quantities, the unavailable product and the removal). Then run `npm run check:tests`. These checks cover the cart calculations only, not the whole checkout.
