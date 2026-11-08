# Connect Filter Controls

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

A client filter form (components/StorefrontFilters.tsx) on the collection and category pages: it reads the submitted values with FormData, normalizes them with readStorefrontQuery, builds the query string without default values and navigates in a transition (router.push with scroll: false); the form is keyed by the current query, so its fields follow Back and Forward, it shows a pending button and status, and fixedCategory keeps a category page's category in the path.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

On /catalog search for studio with Price: low to high and select Apply filters: the address becomes /catalog?q=studio&sort=price and the form keeps the values. Change the choice, then use Back and Forward: the form and the results follow. On a category page the form keeps the category in the path. With `npm run api:slow`, applying shows Applying… and Updating collection before the results; run `npm run api:ready` afterwards. An empty result offers Clear filters; check the keyboard and a narrow width too.
