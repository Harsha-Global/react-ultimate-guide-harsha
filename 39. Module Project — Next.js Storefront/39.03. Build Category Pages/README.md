# Build Category Pages

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

Category pages from the same catalog: the allowed categories and their lookup (lib/categories.ts: the categories list, the Category type and categoryFromSlug), category links that mark the current one with aria-current (components/CategoryLinks.tsx) on the collection, and the dynamic route app/(store)/categories/[category]/page.tsx, which validates the address, shows the not-found page for an unknown category, filters the catalog snapshot and shows an explicit message for a valid category without products.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

On /catalog choose Workspace (only the lamp) and Travel (the backpack, currently unavailable); reload and go Back. /categories/unknown shows the not-found page (the response streams, so do not expect an HTTP 404 status). To see the empty-category message, stop both processes and use a separate copy of the project (without node_modules and .next; its own `npm ci`): remove the lamp's object from the copy's data/api-products.json, start its API and app, open /categories/workspace, then run `npm run api:reset` in the copy to restore the four products. With `npm run api:error` a category page shows the error boundary; `npm run api:ready` and Try again recover. Stop the copy's processes before you return to the main project.
