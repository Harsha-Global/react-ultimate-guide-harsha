# C04 Async Error Handling — Build

Async Error Handling

Build getSaveOutcome(saveOperation). Like the saveBasketReport function in the Async Error Handling lecture, it must wait for a save and return a clear result. This exercise receives the save operation as a zero-argument callback, rather than importing a particular save function.

The supplied saveOperation returns a promise. It fulfills with an object such as { total: 108, status: "saved" }, or rejects with an Error object. Its total is a finite non-negative number; 0 is valid. Call the supplied function exactly once. Keep the supplied simulateSave helper unchanged.

Acceptance criteria
- Await saveOperation() inside the async function.
- On fulfillment, return exactly { ok: true, total: result.total }.
- On rejection, return exactly { ok: false, message: error.message }.
- Keep the actual message; different failures can explain different problems.
- Do not return an early success while work is pending.
- Preserve the successful result object and keep repeated calls independent.

Edit only getSaveOutcome in exercise.js. Use Run tests; the supplied evaluation calls your function and waits for its promise. You do not need to create tests, install anything or make a network request. The simulator uses a short local timer; no data is stored remotely.

Before coding, trace success and rejection on paper. After attempting, use the hints and complete explained solution. Estimated practice time: 8–15 minutes.

## Local route

Use the complete starter/app.js in a separate folder, with the Node environment from the Setting the Environment lecture. Run `node app.js` in its integrated Command Prompt. No module server is needed for this self-contained exercise. The three example outcomes should be success 108, failure with the real message, and success 0. Compare with solution/app.js and its README only after your attempt. Keep the main module project unchanged.

Hint 1
Which expression actually starts the supplied operation? Put the await expression inside the region that handles rejected work.

Hint 2
The fulfilled object and the error object have different useful properties. Return a record with an explicit ok flag in both branches, and preserve the value from the branch you reached.
