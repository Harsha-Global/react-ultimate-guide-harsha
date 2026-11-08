# Test Runtime Validation

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the booking reducer tests).
- Completed/booking-studio: the same project at the end of the lecture: tests/fixtures.ts holds the supplied request and confirmation examples (Alex Morgan, the morning session and a fixed request id); tests/bookingSchema.test.ts parses space-padded contact details (the name trimmed, the email trimmed and lowercase) and checks that safeParse rejects an invalid email and a group whose two entries reuse one attendee id. Keep it for the next lecture.
- Supplied/Test fixtures/fixtures.ts: the supplied fixtures, already in the Completed project's tests folder; copy it into tests when you start from the Starter.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/bookingSchema.test.ts`: the normalization test and both rejection tests pass. Then run `npm run check:tests`. If a rejection test fails after a change, compare its input with the schema rule before changing either.
