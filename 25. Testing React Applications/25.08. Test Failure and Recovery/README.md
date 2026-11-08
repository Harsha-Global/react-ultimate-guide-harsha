# Test Failure and Recovery

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the pending-state test).
- Completed/booking-studio: the same project at the end of the lecture: tests/TypedBookingForm.recovery.test.tsx answers the first booking request once with a 503 (The studio is unavailable.): the alert shows that message and both fields keep their values; a second Book this visit, answered by the default handler, shows the confirmation heading without the alert. Keep it for the next lecture.
- Practice: the False-Positive Tests exercise (Instructions.md, and the Starter and Solution projects, each a complete application). In its Starter run `npm ci` and `npm run test:run -- tests/recovery.practice.test.ts`, repair the test so the deliberately wrong message fails it, then compare with the Solution.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/TypedBookingForm.recovery.test.tsx`: a passing result covers the error message, the kept details and the successful retry. Then try the exercise in the Practice folder.
