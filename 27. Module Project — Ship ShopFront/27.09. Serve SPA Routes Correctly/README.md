# Serve SPA Routes Correctly

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Support Files: the prepared production adapter copied into the project root in the lecture (.gitignore, .node-version, package.json with the start command, server/index.mjs, server/routes.mjs with the exported handleRequest, server/production.mjs, server/staticFiles.mjs). Replace the matching files when prompted.
- Completed/product-explorer: the project at the end of this lecture. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Stop the development API and Vite first. Run `npm run build`, then `npm start` ("ShopFront production demo listening on 5186"). Open http://127.0.0.1:5186/products/p1 directly and reload it: the product page loads. Open http://127.0.0.1:5186/assets/missing.js: the server answers "Not found." instead of the application page. Sign-in from this production address is configured in the next lecture. Stop the server with Ctrl+C before running other checks.
