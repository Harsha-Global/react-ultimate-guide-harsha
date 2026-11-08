# Configure Hosted Sessions

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Support Files: copied into the project root in the lecture after the server edits (.env.example, package.json with verify:production and test:production, tsconfig.test.json, checks/verify-production.mjs, playwright.production.config.ts, src/App.tsx with the practice-shop footer).
- Completed/product-explorer: the project at the end of this lecture (server/production.mjs: the APP_ORIGIN checks; server/auth.mjs: the configured origin, the development fallback and the Secure cookie flag). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Stop any running server of this project first (the checks start their own on port 5186). Run `npm run build`, then `npm run verify:production` (page, asset, API, session, origin, CSRF and staff boundaries) and `npm run test:production` (the two browser journeys against the built server). .env.example documents the settings; Node does not load it automatically, and APP_ORIGIN is not a secret. On the host, set APP_ORIGIN to the exact HTTPS service origin.
