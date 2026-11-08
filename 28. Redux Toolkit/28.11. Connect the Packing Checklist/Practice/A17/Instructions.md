# A17 — Clear Completed Tasks

A staff member wants to tidy the local packing checklist after completing preparation. Add a **Clear completed tasks** button using the patterns taught in this section. Start from `Starter/order-desk`; keep the guided selection workflow unchanged. This is a local checklist change, not an order-fulfillment API call.

## Acceptance checks

- Remove every completed task and preserve every unfinished task, including its ID, text and done value.
- Keep normalized IDs and entities consistent. Do not clear the whole collection merely because one task is complete.
- Derive the completed count; do not add a second stored count to synchronize.
- Disable the button when no tasks are complete. Show the existing empty message after clearing an all-completed list.
- Preserve the selected orders and ready-only filter. Preserve earlier state snapshots.
- Keep keyboard operation and meaningful button text. Existing add, toggle, remove and blank-entry recovery must still work.

Run `npm ci`, then `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. Add a focused regression test for a mixed complete/incomplete list, and test the empty/no-complete cases. As a negative check, temporarily replace the selective removal with removing all tasks: the mixed-list test must fail. Restore the selective rule.

Attempt the feature before opening `Solution/order-desk` or `Review.md`. Expected time: 25–40 minutes. The next section continues the guided main; this optional extension is not a prerequisite.

## Hints

- Find completed IDs from the current task entities.
- The adapter's removeMany helper keeps both normalized structures consistent.
- The component should dispatch an action; the reducer should decide which tasks to remove.

## Submission

Explain what changed, provide evidence for the acceptance checks, and explain why these local tasks belong in this slice rather than the order records. Text and supported screenshots are enough to explain evidence; a public repository is optional. Do not submit secrets or generated dependency folders.

## Rubric

- 40%: selective removal, preserved unfinished tasks and empty state.
- 25%: adapter-based reducer and derived count, with no duplicate state.
- 25%: meaningful regression and boundary checks, keyboard behavior and preserved order selection.
- 10%: clear explanation and evidence.
