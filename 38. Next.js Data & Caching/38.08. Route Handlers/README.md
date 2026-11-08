# Route Handlers

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab: the Catalog Lab app as completed in the previous lecture.
- Support Files: the route check script (scripts/check-route.mjs), copied into the project in the video.
- Practice: the Available Catalog Endpoint assignment (an optional in-stock filter for the endpoint), with its own Starter, Solution, instructions, run guide, worked answers and endpoint check script.
- Completed/catalog-lab: the app at the end of this lecture. Keep it for the next lecture.

A public read-only Route Handler (app/api/catalog/route.ts): GET validates the category query parameter, reads the cached catalog and returns JSON with Cache-Control: no-store; unsupported or repeated categories return 400, other methods 405, and a failed uncached read 503.

## Run

Copy the catalog-lab folder into your React workspace (for example C:\react\catalog-lab; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture enables the local stock form; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

In production open /api/catalog and /api/catalog?category=Workspace. `node scripts/check-route.mjs http://127.0.0.1:3000` checks the status codes and the unsupported method. For the assignment, stop both processes, copy the Available Catalog Endpoint folder to a path without & and follow its Run Guide.
