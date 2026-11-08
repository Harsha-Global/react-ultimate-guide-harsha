# Add the Product Overlay

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files: the product dialog built on radix-ui (components/ProductModal.tsx), copied into the project in the video, and the dependency command (Dependency command.txt).
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

A product overlay with parallel and intercepting routes: radix-ui installed with `npm install radix-ui@1.7.0 --save-exact`; a @modal slot in the store layout, rendered in its own Suspense boundary, with default, empty home and catch-all pages that return null; and the intercepting route app/(store)/@modal/(.)products/[slug]/page.tsx, which opens the product details in the supplied dialog over the collection, while a direct visit or a reload of the same address still shows the full product page.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

On /catalog select Studio Desk Lamp: the details open in a dialog over the collection and the address becomes /products/studio-desk-lamp. Tab stays inside the dialog; Escape closes it and returns focus to the lamp link. Reopen it and reload: the full product page appears. Back and Forward move between the collection and the dialog; closing it and choosing Our story shows no dialog. Check a narrow window (about 390 px) too.
