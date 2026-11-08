# Test Reducer Rules

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the Option Picker interaction test).
- Completed/booking-studio: the same project at the end of the lecture: tests/bookingReducer.test.ts calls the real bookingReducer with a two-person group fixture (Studio team: Alex and Jordan): adding Casey returns the three attendees while the original pair keeps two (toEqual), and removing below two people, adding an existing attendee again and adding an attendee to an individual draft each return the same state (toBe). Keep it for the next lecture.
- Practice: the Remove one attendee exercise (Instructions.md, and the Starter and Solution projects, each a complete application). In its Starter run `npm ci`, complete tests/removal.practice.test.ts and run `npm run test:run -- tests/removal.practice.test.ts` and `npm run check:tests`; compare with the Solution afterwards.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/bookingReducer.test.ts`: the four reducer tests pass, each named after its rule. Then try the exercise in the Practice folder: removing one person from a group of three keeps the other two in order and leaves the earlier draft unchanged.
