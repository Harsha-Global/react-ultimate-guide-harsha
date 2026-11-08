# Remove one attendee

The client allows removing one person from a three-person group, but the two remaining attendees and the earlier draft must be preserved. Complete `tests/removal.practice.test.ts`. Do not change the reducer to fit an incomplete test.

1. Confirm that the returned draft contains Alex and Casey in their original order, with the group details intact.
2. Confirm that the original draft still contains all three attendees, including Jordan.
3. Run `npm ci`, then `npm run test:run -- tests/removal.practice.test.ts` and `npm run check:tests`.
4. In a disposable copy, return the current state from the removal branch. Your completed test must fail. Restore the reducer and confirm it passes.

The starter's existence assertion is intentionally insufficient: it passes even when nobody is removed. Hint: compare the returned contents and inspect the original draft separately. Try the task before opening `Solution/booking-studio`. Expected time: 10–15 minutes.
