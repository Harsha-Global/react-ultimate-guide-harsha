# Test the Booking Journey

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the first browser test).
- Completed/booking-studio: the same project at the end of the lecture: e2e/booking.spec.ts follows a visitor in the browser against the running API: it fills Contact name and Email address, books the visit, waits for the confirmation heading, checks that the Open this confirmation link points to ?booking=<reference>, opens it, sees 1 place · morning session, reloads the page and sees the saved booking again. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npx playwright install chromium` once (it downloads Playwright's own Chromium build, separate from your everyday browser) and stop any `npm run api` or `npm run dev` you started yourself, then run `npm run test:e2e`: Playwright starts both servers, and both browser tests pass (2 passed). The local API keeps bookings in memory, so a reload finds the booking while it runs.
