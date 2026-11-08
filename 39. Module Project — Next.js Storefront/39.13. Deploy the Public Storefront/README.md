# Deploy the Public Storefront

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files/scripts/host.mjs: the hosting launcher (it resets the fixture, starts the read-only sample API on 127.0.0.1:5211, then Next on the public port), copied into the project in the video.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

A public preview of the storefront: the sample API refuses stock changes in the hosted read-only mode, a no-store health route (app/api/health/route.ts) checks the API, package.json gains the host:build and host:start scripts, .node-version selects Node 24, and lib/site.ts takes the public address from SITE_URL or Render's RENDER_EXTERNAL_URL. The video then commits the project folder to a new GitHub branch and deploys it as a free Render web service (root directory shopfront-next, build command `npm ci && npm run host:build`, start command `npm run host:start`, health check path /api/health, Auto-Deploy off, no environment variables).

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture shows the local inventory editor on the collection when the site is opened on this computer; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost, as 127.0.0.1 is a different browser-storage origin for the shortlist). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

To try the launcher locally, stop both processes, then in PowerShell run `$env:SITE_URL="http://127.0.0.1:10000"`, `npm run host:build` and `npm run host:start` (macOS/Linux: `SITE_URL=http://127.0.0.1:10000 npm run host:build`, then the same for host:start). Open http://localhost:10000: the collection has no inventory editor (the launcher disables writes), /api/health answers {"status":"ok","demo":"public-read-only"}, and the sitemap and canonical links use http://127.0.0.1:10000. Stop it with Ctrl+C and remove the variable (`Remove-Item Env:SITE_URL`). For your own deployment, commit the project folder (its .gitignore keeps node_modules, .next and .env.local out), use the Render settings above and check the hosted search, overlay, shortlist, a missing product, the canonical link and /sitemap.xml on the service's address.
