# L07 — Optimistic Actions

Build an immediate review preview in this isolated Starter/booking-studio copy. The form already loads and saves reviews and displays request errors. Currently, a new row appears only after confirmation. Keep the working request helper, validation, labels and pending field controls.

## Run

Copy Starter/booking-studio under C:\react. Stop the main booking-studio terminals first. Run npm ci, then npm run api:slow in one terminal and npm run dev in another. Check http://127.0.0.1:4318/api/health, then open http://localhost:5210 and choose Reviews. The slow mode deliberately delays writes so you can inspect the preview. Normal npm run api has no artificial delay. Data is in memory: restarting resets it. The local POST /api/reset endpoint also restores seeds; reload after resetting.

## Build and check

- Add a pure optimistic reducer and the useOptimistic hook using the confirmed list as the base.
- Start a temporary review inside the form Action. Use the draft's existing clientId and mark only that temporary row as pending.
- Display the temporary list and a Sending label while the request is active.
- Accept a normal review: the saved record replaces the preview, without a duplicate row or Sending label.
- Submit a review containing https://example.com: the server rejects links. Remove the preview, keep the saved list intact, show the useful error, and preserve the draft.
- Remove the link and retry. Verify one saved row for that accepted attempt. Reload/select Reviews to check the server's list.
- Keep old feedback from appearing alongside a new temporary preview.

Explain why the preview is not a confirmed server write. Also explain what your UI can and cannot conclude from a lost response. Keep request/runtime validation and server decisions intact. Run npm run build and npm run lint after your edit.

Try before consulting Hints.md or Solution/booking-studio. This is a local build exercise with manual acceptance checks, not an automatic Udemy code grader. Find the full package in the course source repository, inside Optimistic UI with useOptimistic/Practice/L07, through the How to Download Source Code article.
