# Check Browser Journeys in CI

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project at the end of the previous lecture (repository folder: RELEASE.md at the root, the application in booking-studio).
- Completed/booking-studio: the same project at the end of the lecture: the application with playwright.production.config.ts (the existing e2e tests against `npm start`), the script `test:production`, the config in tsconfig.test.json, and the workflow's Chromium install, production browser tests and failure-artifact upload. Keep it for the next lecture.
- RELEASE.md: the release checklist at the repository root (beside booking-studio).
- .github/workflows/booking-studio.yml: the GitHub Actions workflow at the repository root.

## Run

Copy the Completed folder's contents into your repository folder (for example C:\react\react-teaching-demos), so RELEASE.md sits at the repository root and the application is the inner booking-studio folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. Production: after `npm run build`, run `npm start` and open http://127.0.0.1:4318 (the built app and its API from one Node process); `npm run verify:production` runs the supplied automated check on its own port. Development: `npm run api`, then `npm run dev` in a second terminal and http://127.0.0.1:5210. Demo bookings are kept in memory; no real payments occur. Use your own GitHub repository and your own Render service for the remote steps.

## Try it

Run `npm run check:tests`, `npm run build` and `npm run test:production` (first `npx playwright install chromium` if needed). Push the workflow change and check the run. On a separate branch, change one expected heading in e2e/booking.spec.ts, open a pull request, download the booking-studio-failure artifact, open its trace with `npx playwright show-trace "<path>\trace.zip"`, then restore the expectation and check the run passes. The Practice folder holds the release assignment, the quiz and the review scenario.
