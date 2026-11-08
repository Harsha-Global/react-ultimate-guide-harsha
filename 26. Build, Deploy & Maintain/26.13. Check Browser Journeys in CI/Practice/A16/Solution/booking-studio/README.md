# Independent activity source

Read `../../Instructions.md` before using this source. This is the complete worked solution, separate from the guided main application. Keep the previous guided main unchanged.

# Check Browser Journeys in CI — Booking Studio

Add the actual Chromium journey, preserve failure traces and repair a failed check without disabling it.

This is the completed source for this lecture. Follow the previous lecture checkpoint for the guided changes.

Use the existing TypeScript Booking Studio. Keep the application inside your repository: `C:\react\react-teaching-demos\booking-studio`. Run application commands in this inner folder and Git commands from the outer repository folder. Do not create a nested Git repository.

```text
npm ci
npm run lint
npm run check:tests
npm run test:run
npm run build
```

For editing, run `npm run api` and `npm run dev` in separate terminals. The API uses port4318; Vite uses5210. The browser-test runner starts its own processes; stop manual copies before using it. Vite preview is a local build check; its proxy can forward requests to an already-running local API. It does not start that API.

Demo bookings are stored in memory. Confirmation reload works while the process retains the booking; restarting or sleeping the server resets it. Use fictional sample details. No payment is collected. Keep font licenses with the bundled assets.

Copy `Repository Files/RELEASE.md` from this lecture into the outer repository root. It records manual release checks; it does not execute them.

The committed `.env.production` contains only the public `VITE_RELEASE_LABEL` text. `.env.example` documents it. Browser-prefixed values are not secret; rebuild after changing the production value. Normal development uses the Local preview fallback.

## Production adapter

Use the supplied `.node-version` runtime. Run `npm run build`, then `npm start`; open `http://127.0.0.1:4318`. This single Node process serves dist and the existing API. The production adapter blocks `/api/reset`, returns404 for missing assets and serves the query-string confirmation at `/`. It does not need a wildcard fallback. Stop the manual server before `npm run verify:production`, which starts its own instance on5431.

For the optional Render demo, choose a Free Web Service with repository root directory `booking-studio`, build command `npm ci && npm run build`, start command `npm start`, and health path `/api/health`. Use your own private repository. Free account limits and eligibility can change; the local production verification path remains available without an account. The instructor's private teaching repository is not a student source-download address.

Failure reporting emits only the event name, a fixed location label and the public release label. It does not forward contact details, request bodies or raw error messages. This local console adapter is not a connected monitoring service.

This checkpoint includes the controlled oxlint1.86.0 update. The earlier checkpoint uses1.83.0. React and the other dependencies remain pinned. Use the included lockfile for this stage.

Copy `Repository Files/.github/workflows/booking-studio.yml` into `.github/workflows` at the outer repository root. The workflow explicitly runs commands inside booking-studio. This is an author-provided workflow; remote execution evidence is recorded separately.

For real production browser checks, install Chromium with `npx playwright install chromium`, then run `npm run test:production` after the build. The runner starts the production server itself. CI additionally installs the Linux browser dependencies and preserves failed-run artifacts for three days.
