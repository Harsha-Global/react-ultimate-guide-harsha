# Automate the Shopping Journey

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Support Files: playwright.config.ts, tsconfig.test.json and e2e/shopping.spec.ts, copied into the project root in the lecture (replace the existing tsconfig.test.json).
- Completed/product-explorer: the project at the end of this lecture (the Playwright configuration starts the API on 4185 and Vite on 5185 itself, one worker, traces kept on failure; two browser journeys). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Stop any manually started API or dev server of this project first (Playwright starts its own). If Chromium is not installed yet, run `npx playwright install chromium` once. Then run `npm run test:e2e`: two journeys pass. `npm run check:tests` checks the test TypeScript. This is local development-server evidence, not a hosted or all-browser check.
