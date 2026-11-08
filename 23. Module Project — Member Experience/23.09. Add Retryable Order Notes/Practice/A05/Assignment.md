# A05 — Retryable Order Notes

Save a note for one confirmed order, preserve a failed draft, and allow a clear retry.

## Client request

The client wants a member to add a short note to an existing order. The supplied endpoint deliberately rejects the first attempt using the sample text Please leave with Jordan, so the recovery path is observable.

## Your work

Use the supplied note API helper and the form-action pattern taught earlier. Keep the note controlled, show pending feedback and prevent duplicate submission while pending. On success, update only the matching saved order in that member’s cached history. Keep the other cards and their notes unchanged. Handle an expired session through the existing session owner. Keep this separate from the guided main checkpoint.

## Start and check

Run npm run api and npm run dev in separate terminals. Open http://127.0.0.1:5185. Use jordan@example.com or rebecca@example.com with PracticeOnly42!. Stop previous ShopFront servers first.

1. Sign in as Jordan and place an order if his local history is empty. Enter exactly Please leave with Jordan in one order’s note field.
2. The first attempt receives the prepared 503 failure. The draft must still contain that text, and an error must explain the retry.
3. Retry the same text. It should save for that order, with useful pending and success feedback.
4. Confirm that the other order cards and notes remain unchanged. Reopen history and verify the saved note.
5. Try a blank note and check validation. Use the supplied local session-expiry check and confirm that a private write is rejected and the app returns to sign-in. Build and lint.

## Submit your explanation

1. What did you change?
2. Which checks did you run, and what did you observe?
3. Why does your chosen state owner or validation boundary fit this requirement?

Use the course source-code route in How to Download Source Code. The starter and full separate solution belong to this lecture’s Practice/A05 folder. Attempt and test your work before opening Solution. This is a manually reviewed assignment, not an automatic grader or an extra recorded solution lecture.
