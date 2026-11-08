# Solution and reasoning

OrderNoteForm owns a controlled note draft and uses the form action result for feedback. The submit button reads the surrounding form’s pending state. After the request succeeds, the cache update maps the current member’s order list and replaces only the returned order. A failed request returns a message while leaving the controlled value intact. The request helper and session checks keep the write tied to the signed-in owner.

A small note does not require optimistic UI to provide useful feedback. Waiting for the confirmed result keeps this recovery flow simple. The endpoint is a local practice service; restarting it clears in-memory sessions, orders and its first-failure fixture.

## Checks

- Sign in as Jordan and place an order if his local history is empty. Enter exactly Please leave with Jordan in one order’s note field.
- The first attempt receives the prepared 503 failure. The draft must still contain that text, and an error must explain the retry.
- Retry the same text. It should save for that order, with useful pending and success feedback.
- Confirm that the other order cards and notes remain unchanged. Reopen history and verify the saved note.
- Try a blank note and check validation. Use the supplied local session-expiry check and confirm that a private write is rejected and the app returns to sign-in. Build and lint.
