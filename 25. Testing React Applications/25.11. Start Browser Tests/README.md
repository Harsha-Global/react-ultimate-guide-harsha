# Start Browser Tests

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the saved confirmation test).
- Completed/booking-studio: the same project at the end of the lecture: playwright.config.ts configures Playwright (tests in e2e, one worker, a retry only on CI, the list and html reporters, baseURL http://127.0.0.1:5210, traces kept on failure, a Chromium project, and webServer entries that start `npm run api` and `npm run dev` and wait for their addresses); package.json adds `test:e2e` (playwright test); e2e/studio.spec.ts opens the studio and checks that Book this visit is visible and Contact name is editable. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npx playwright install chromium` once (it downloads Playwright's own Chromium build, separate from your everyday browser) and stop any `npm run api` or `npm run dev` you started yourself, then run `npm run test:e2e`: Playwright starts both servers, and the check passes (1 passed). `npm run test:run` still runs the component and unit tests.
