# Deploy ShopFront

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture.
- Repository Files/.github/workflows/shopfront.yml: the release-check workflow; it goes at the teaching repository's .github/workflows/shopfront.yml, and the project's contents go into the repository's shopfront folder (without node_modules, dist, test-results and the local API's data.json and control.json).
- Completed/product-explorer: the released source (this lecture changes no project files). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Deploy

Push the shopfront folder and the workflow on a branch, open a pull request, wait for the ShopFront release checks to pass, merge it and copy the merged commit's full identifier (SHA). On Render, create a web service from your connected teaching repository (New, Web Service): Node runtime, branch main, Root Directory shopfront, Build Command `npm ci && npm run build`, Start Command `npm start`, the Free instance type, Health Check Path /api/health and Auto-Deploy Off. Add the environment variable APP_ORIGIN with your service's exact https address (no path, no trailing slash). After the service is created, compare it with the address Render actually assigned (Render may add a suffix) and correct it on the Environment page with Save only. Then choose Manual Deploy, Deploy a specific commit, paste the checked identifier and click Deploy Commit; check the commit in the log, wait for Live and open the address. A free instance sleeps when idle (its first response can be slow), and its orders and sessions are held in memory (a restart clears them).
