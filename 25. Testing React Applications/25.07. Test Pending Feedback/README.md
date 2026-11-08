# Test Pending Feedback

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the request helper tested against Mock Service Worker responses).
- Completed/booking-studio: the same project at the end of the lecture: tests/TypedBookingForm.pending.test.tsx holds the booking response on a Promise.withResolvers gate: while it waits, the Saving booking… button and the Contact name textbox are disabled; the gate is released in a finally block, and the confirmation heading then appears. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/TypedBookingForm.pending.test.tsx`: it passes without a fixed delay. To see the same state in the browser, run `npm run api:slow` and `npm run dev`, and book a visit: Saving booking… and the disabled fields show before the confirmation.
