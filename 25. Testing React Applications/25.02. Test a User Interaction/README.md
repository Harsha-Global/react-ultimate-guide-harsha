# Test a User Interaction

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as completed in the previous lecture (the first Vitest test).
- Completed/booking-studio: the same project at the end of the lecture: vitest.config.ts adds the React plugin, the jsdom environment, the setup file and a local test address (no server is started); tests/setup.ts adds the jest-dom assertions for Vitest and cleans up rendered components after each test; tests/OptionPicker.test.tsx renders the real OptionPicker inside a small parent that keeps the selection in state, clicks Evening with user-event, and checks that Evening is pressed and Morning is not. Keep it for the next lecture.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio; move an earlier Booking Studio copy out of that folder first) and open it in VS Code. In its terminal run `npm ci`, then `npm run test:run` (the tests, once) and `npm run check:tests` (the TypeScript of the tests). For the app, run `npm run api` (the local API on port 4318) and, in a second terminal in the same folder, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run test:run -- tests/OptionPicker.test.tsx`: the test passes. To see what it protects, temporarily replace setSelected(option.id) in the test's onSelect callback with a function that does nothing and run it again: the Evening assertion fails because the selected id never changes. Restore the callback, run the test again and then `npm run check:tests`.
