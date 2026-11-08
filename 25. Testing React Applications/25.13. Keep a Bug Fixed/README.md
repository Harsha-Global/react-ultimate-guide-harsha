# Keep a Bug Fixed

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the booking journey test).
- Completed/booking-studio: the same project at the end of the lecture: tests/bookingReducer.test.ts keeps a regression test: a full group of eight attendees rejects a ninth (the reducer returns the same draft and the list keeps its eight entries). Keep it for the next lecture.
- Demonstrations/Over-capacity bug: a separate copy with a deliberately faulty reducer (it accepts a ninth attendee) and the earlier reducer tests. Run `npm ci` in it, add the regression test, run `npm run test:run -- tests/bookingReducer.test.ts` to see it fail, then change `> 8` to `>= 8` and run it again.
- Demonstrations/Failing regression: the same faulty copy with the regression test already added (its failure is expected).
- Practice: the Protect a Group Booking assignment (Instructions.md, and the Starter and Solution projects, each a complete application): a component test that checks the complete group request and the two-place confirmation. In its Starter run `npm ci` and write tests/group.assignment.test.tsx, then compare with the Solution.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run`: every test passes, including the full-group regression. Then try the demonstration and the assignment.
