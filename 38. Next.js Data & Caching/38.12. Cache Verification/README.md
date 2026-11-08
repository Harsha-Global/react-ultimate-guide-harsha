# Cache Verification

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab and Completed/catalog-lab-checkpoint: the finished Catalog Lab (this lecture changes no project file; the video works in a separate checkpoint copy).
- Practice: the Incorrect Cache Tags practice (a copy whose stock action expires the wrong cache tag, with its Solution and instructions) and the Caching Review role play (the scenario, written prompts and a sample response).

This lecture follows one stock edit from the API through the server cache into the page, then repairs a prepared bug in which the invalidation call names the wrong cache tag.

## Run

Copy the catalog-lab-checkpoint folder into your React workspace (for example C:\react\catalog-lab-checkpoint; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture enables the local stock form; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

In production with local writes enabled, save a new stock value and check All, Workspace and the summary; repeat with `node scripts/api-mode.mjs reject`, then `npm run api:ready`. For the practice, copy the Incorrect Cache Tags folder to a path without & and follow its Instructions.txt: reproduce the stale card within 60 seconds, repair the tag, rebuild and repeat.
