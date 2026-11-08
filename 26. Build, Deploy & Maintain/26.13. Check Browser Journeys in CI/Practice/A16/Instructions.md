# Release a clear booking confirmation

The studio wants a visitor who opens a saved confirmation to see whether it is an individual or group booking. Implement the small UI change, prove it in the built application, and prepare reviewable release evidence.

Start with `Starter/booking-studio`. In `src/BookingResult.tsx`, add “Individual booking” or “Group booking” to the successful result, based on the existing server-confirmed `kind`. Keep the loading, missing-reference and retry paths intact. Do not infer the kind from the current form draft or place count.

Complete `e2e/release.assignment.spec.ts` with a real two-person group journey. Enter sample details through accessible controls, submit, follow the confirmation link, verify the group label and two places, then reload and verify them again. Use the existing production configuration; do not mock the production API or add fixed delays.

Run `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run`, `npm run build`, `npm run verify:production` and `npm run test:production`. The last command must run all existing browser checks and your new journey. Stop manual servers first. For a meaningful negative check, temporarily make the successful result always display “Individual booking”: the new test must fail. Restore the condition and confirm a passing result.

Prepare a focused branch and review its difference. Include a short release record: changed files, exact checked commit, commands/results, successful direct reload, missing-reference recovery and the in-memory reset limit. GitHub CI and eligible free hosting are optional environments for the same work; a complete local production result is accepted. Do not choose paid services to finish this assignment.

Submit the source change, browser test, and release record. Do not include node_modules, dist, credentials or real contact details. Full solution: `Solution/booking-studio`; root workflow support: `Solution/Repository Files`. Expected time: 30–45 minutes.

## Hints

- Read `BookingConfirmation` and the `result` success branch before adding another state variable.
- Keep both result paragraphs within one fragment so the existing conditional still returns one expression.
- Assert the visible label after navigation and after reload. The current form's group button alone cannot prove a saved result was restored.

## Grading rubric

- 40 points: label comes from the returned kind; both choices and existing recovery paths work.
- 25 points: real group browser journey checks the label, place count and reload; negative control fails.
- 25 points: relevant commands pass and the release record identifies evidence and storage limits.
- 10 points: focused readable change; no copied generated folders or private data.
