# A18 — Remember the Totals Preference

The operations team wants to hide monetary totals while screen-sharing the queue. Add a Show order totals checkbox to Workspace preferences. Keep the guided main project unchanged; work in this separate Starter/order-desk copy.

Acceptance criteria:
1. Totals are visible by default. Unchecking hides the queue Total heading/cells and the amount in the selection summary; other columns, counts and selection still work.
2. The current interface responds immediately. The listener saves the boolean after the same quiet interval as density.
3. Only version, density and showTotals are saved. A valid false value survives reload. Missing, malformed or unsupported values use true; do not treat the string "false" as a boolean.
4. Reset restores both defaults, removes this app's key and cancels any scheduled save. It must not clear unrelated browser keys.
5. Tests cover the visible control, false restoration, invalid storage and reset during a pending save.

In a new folder such as C:\react\totals-preference, install this starter with npm ci. Run npm run dev, npm run check:tests and npm run test:run. The optional packing preview additionally needs npm run api in another terminal; stop another Order Desk app/API before using the same ports. For this preference task no account is required. Attempt first, then install and run the separate Solution/order-desk with its own npm ci. Do not merge the solution into the guided main. The rubric uses manual/self-review, not a native automatic project grader.

Source route: use How to Download Source Code and the folder 29. Redux Workflows/Redux Integration Tests/Practice/A18 - Remember the Totals Preference.

Manual/self-review rubric (10 points): 2 points each for the correct visible control; allowlisted and validated restoration; cancelable reset; preservation of the separate guided main project; and meaningful tests. Aim for 8/10 with no stale-write or invalid-value defect. Compare the complete solution only after attempting the task.
