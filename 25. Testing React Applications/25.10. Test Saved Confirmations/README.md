# Test Saved Confirmations

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the shared context test).
- Completed/booking-studio: the same project at the end of the lecture: tests/BookingResult.test.tsx answers the first load of the fixture booking once with a 503: the loading status shows first, then the alert (We could not load this booking.); Try again loads the saved confirmation (its reference · 1 place · morning session) and the alert is gone. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/BookingResult.test.tsx`: it passes.
