# Server Functions & Actions

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab: the Catalog Lab app as completed in the previous lecture.
- Support Files: the updated sample API and fixture switch (scripts), the local write guard (lib/demoWriteAccess.ts), .env.local.example and the stock input tests (tests/stockInput.test.mjs), copied into the project in the video.
- Practice: the Validate Stock Form Data coding exercise (a small TypeScript project, no server, with its own Starter, Solution, instructions and run guide).
- Completed/catalog-lab: the app at the end of this lecture. Keep it for the next lecture.

A Server Action (app/actions/stock.ts) that checks the local demonstration guard and validates the submitted values (lib/stockInput.ts) before sending the stock change to the sample API, and the stock form and editor (components/StockForm.tsx with useActionState, components/StockEditor.tsx) on the data workshop.

## Run

Copy the catalog-lab folder into your React workspace (for example C:\react\catalog-lab; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture enables the local stock form; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

On /data-lab save 7: the Confirmed stock line and the API agree. Run `node scripts/api-mode.mjs reject` and try 9: the form keeps 7 and explains the rejection; run `npm run api:ready` and retry. `npm test` runs the input parser tests. The cached cards can still show the earlier snapshot here (the write is connected to cache invalidation later in the section). For the coding exercise, copy its folder to a path without & and run `npm ci`, then `npm test` in its Starter.
