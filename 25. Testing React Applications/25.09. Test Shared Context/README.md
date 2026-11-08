# Test Shared Context

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the failure-and-recovery test).
- Completed/booking-studio: the same project at the end of the lecture: tests/Booking.context.test.tsx renders the real Booking.Root, two Booking.Option buttons and Booking.Summary inside a small BookingExample parent that owns the selected slot: clicking Evening shows Evening in the status paragraph and clears the Morning button's pressed state. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/Booking.context.test.tsx`: it passes. Run `npm run check:tests` to check the types of the tests.
