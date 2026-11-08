# Mock the API Boundary

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the form validation test).
- Completed/booking-studio: the same project at the end of the lecture: tests/server.ts defines the default Mock Service Worker handlers (POST /api/typed-bookings returns the confirmation fixture with status 201; a GET for the fixture's reference returns it too); tests/setup.ts starts interception before the tests (unhandled requests are errors), resets temporary handlers after each test and stops it at the end; tests/typedBookingApi.test.ts checks the normalized body the real submitTypedBooking sends and the confirmation it returns, and that a 503 response rejects with the server's message. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/typedBookingApi.test.ts`: the successful request test and the rejection test pass with no API running. Then run `npm run check:tests` and the whole suite with `npm run test:run`.
