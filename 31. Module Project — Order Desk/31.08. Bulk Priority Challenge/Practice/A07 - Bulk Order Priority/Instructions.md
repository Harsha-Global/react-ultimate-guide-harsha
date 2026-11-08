# A07 — Bulk Order Priority

Estimated attempt:50 minutes. Work in the independent `Starter/order-desk`; the guided main project stays separate. Obtain this source package using the course's “How to Download Source Code” workflow. No public repository URL is assumed.

The packing supervisor needs to select ready orders across pages, review their current records and apply high priority in one operation. Some orders may be accepted while others are rejected. Keep the result understandable and recoverable.

## Setup

1. Stop earlier Order Desk processes on ports5188/5189 with Ctrl+C. Open `Starter/order-desk` in a separate editor window. Use the supplied Node version and lockfile.
2. Run `npm ci`, then `npm run api`. Verify `http://127.0.0.1:5189/api/health` returns `{"status":"ok"}`.
3. In a second terminal in the same project, run `npm run dev`; open `http://127.0.0.1:5188/`. Choose Operator, then Open North. API restarts reset records and sessions; reopen a workspace afterwards.
4. Read `API Contract.md`. The service, priority fields/column, selected-record review, response types/parser and acceptance tests are supplied. The disabled Apply high priority button marks the unfinished task.

## Implement

- Inject the mutation into the existing API. Submit selected IDs with their reviewed versions, including selections on other pages; do not silently replace captured versions with newer live values.
- Block a changed selection after review, duplicate submission and viewer editing. Keep server permission enforcement intact.
- Show accepted and rejected item results separately. Remove only accepted IDs from the current selection, preserving rejected and newly selected IDs. Do not toggle accepted IDs or clear the whole selection.
- Preserve all selection after a whole-request failure. Show an actionable error. Refresh affected ordinary queries after the mutation.
- Ignore a late result from an earlier session before modifying selection or showing a report. Clear the review after receiving item results; require a new review for another attempt.

## Evidence and checks

- Fresh North: manually selectOD-1041 ready andOD-1042 payment-pending; review/apply. Expect1 acceptance,1 rejection;1042 stays selected.
- Review a ready1041, then use Change first order on server before applying. The reviewed version must receive409. Observe the actual current versions.
- Change selection after review; submission must require another review. Also verify a viewer, a whole-request failure, a new selection during a pending request and a workspace switch while pending.
- Run `npm run test:run -- tests/bulk-priority.test.tsx`. Starter:1pass/2expectedfail. Completed solution:3pass. Then run `npm run test:run`, `npm run check:tests`, `npm run lint`, `npm run build`.

Submit your explanation, relevant changed code and screenshots/test output for the three assignment questions. Do not include cookies or other credentials. Attempt the task before opening `Solution/order-desk`; install that independent copy with its own `npm ci` when reviewing it.

## Manual rubric — 10 points

2:correct versioned request/current review;2:per-item outcomes and accepted-only removal;2:pending/viewer/error recovery;2:session boundary and new selections preserved;2:reproducible test/browser evidence. Different implementations are valid when they meet the observable contract.
