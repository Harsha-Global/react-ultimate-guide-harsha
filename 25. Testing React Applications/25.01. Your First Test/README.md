# Your First Test

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the supplied starting project: the completed Booking Studio from the previous section (individual and group bookings, checked requests and reopenable confirmations), with the testing dependencies and the test TypeScript configuration (tsconfig.test.json, `npm run check:tests`) already supplied.
- Completed/booking-studio: the same project at the end of the lecture: package.json adds the `test` script (Vitest, rerunning affected tests as you edit) and `test:run` (one run); vitest.config.ts includes the `tests/**/*.test.{ts,tsx}` files; tests/placesFor.test.ts checks that placesFor returns 1 for an individual booking. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run`: the report shows the individual-booking test passing. Change the expected number in tests/placesFor.test.ts to 2 and run it again: the report names the test and shows expected 2, received 1; restore 1 and run it once more. Run `npm run check:tests` to check the types of the tests. `npm test` keeps Vitest open and reruns affected tests as you edit.
