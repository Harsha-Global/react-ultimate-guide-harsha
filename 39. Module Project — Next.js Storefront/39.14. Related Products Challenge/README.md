# Related Products Challenge

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next and Completed/shopfront-next: the ShopFront app as completed in the previous lecture (this lecture changes no project file).
- Practice: the Related Products assignment (a related-products page for each product), with its README (the brief and the grading), its Starter and Solution projects and Recording Support/Uncached Recovery Check for the empty and outage checks.

This lecture presents the Related Products assignment: a /products/[slug]/related page that shows up to two other available products, the current product's category first, built from one catalog snapshot with its own metadata, an explicit empty result and an Explore related products link on the product page. The video opens the assignment's Starter and runs its tests, which fail until the selector is implemented.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture shows the local inventory editor on the collection when the site is opened on this computer; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost, as 127.0.0.1 is a different browser-storage origin for the shortlist). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

Stop the guided project's processes, then open the Related Products assignment's Starter/shopfront-next (in a path without &): run `npm ci` and `npm run api` in one terminal and `npm run dev -- --port 3000` in another; in a third, `npm test` reports 7 of 36 tests failing until you implement selectRelatedProducts. After your attempt run `npm test`, `npm run typecheck` and `npm run build` with the API running, and compare with the Solution only afterwards. The assignment's Recording Support/README.txt explains the empty and outage checks.
