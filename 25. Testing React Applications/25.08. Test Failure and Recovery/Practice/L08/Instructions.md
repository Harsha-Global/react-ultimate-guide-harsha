# False-Positive Tests

The supplied test is green, but its assertion only checks that an asynchronous helper returned something. That something is a Promise, not the message inside it. It cannot distinguish successful recovery from an error message.

1. Run the supplied test with `npm run test:run -- tests/recovery.practice.test.ts`.
2. In `src/recoveryMessage.ts`, temporarily return `The booking is still unavailable.`. The incomplete test still passes.
3. Repair the test so it waits for the helper and checks the actual successful message. Keep the wrong return value temporarily: the repaired test must fail.
4. Restore the correct helper message. The repaired test must pass. Run `npm run check:tests` too.

Use `npm ci` first. Keep this helper isolated from the main app; it is a small demonstration of an invalid test assumption. Do not repair the exercise with a fixed delay or by changing the expected result to match the broken message. The form recovery integration is already covered by the lecture's real component/MSW test.

Hint: make the test callback asynchronous and await the result, or return an awaited promise assertion. Full solution: `Solution/booking-studio`. Expected time: 10 minutes.
