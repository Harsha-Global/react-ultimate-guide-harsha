# Test Form Feedback

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the request schema tests).
- Completed/booking-studio: the same project at the end of the lecture: tests/TypedBookingForm.validation.test.tsx renders the real TypedBookingForm (individual, morning, a vi.fn() lock callback), types A as the contact name and a valid email, chooses Book this visit, then waits for the alert (Check the contact details and every name in this booking.), checks that Book this visit is enabled again and that no confirmation heading appears. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/TypedBookingForm.validation.test.tsx`: the test passes. In the browser, enter a one-letter contact name and a valid email and choose Book this visit: the same message appears, and no booking request is sent.
