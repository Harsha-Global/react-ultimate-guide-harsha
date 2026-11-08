# Build the Shortlist Provider

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files: the saved-shortlist validation (lib/publicShortlist.ts) and its tests (tests/publicShortlist.test.mjs), copied into the project in the video.
- Recording Support/Storage Failure Demo: an isolated copy whose browser-storage reads or writes can be made to fail (`node scripts/storage-scenario.mjs read-failure`, `write-failure`, `ready`), to check the recovery behaviour with its own install, API and app; see Recording Support/README.txt.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

One owner for the shortlist: a client provider (components/PublicShortlistProvider.tsx) in the store layout around the header, the pages and the overlay. It restores the saved product IDs from browser storage after hydration (the shopfront:public-shortlist key), saves changes once restoration is ready, keeps a message when storage fails and shares the selection through usePublicShortlist; each product card gets a shortlist button (components/ShortlistButton.tsx, with aria-pressed, disabled until restoration finishes).

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost, as 127.0.0.1 is a different browser-storage origin for the shortlist). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

On /catalog shortlist the lamp (the button is pressed), open the Workspace category (still selected) and reload: the choice returns after hydration. Remove it and reload: the list stays empty. `npm test` runs the shortlist tests. For the storage failure checks, stop both processes and follow Recording Support/README.txt in the Storage Failure Demo: `npm ci` and `npm run api` in one terminal; in another `node scripts/storage-scenario.mjs read-failure`, then `npm run dev -- --port 3000`; stop Next before each mode change and repeat with `write-failure`, then `ready` (it restores the supplied provider). Reset only the shopfront:public-shortlist key at /course-public-storage-check, never all of localStorage. In this version the demo shows the storage message in a temporary panel.
