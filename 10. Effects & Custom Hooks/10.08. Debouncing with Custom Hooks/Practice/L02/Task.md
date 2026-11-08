# L02 — Missing Cleanup

**Issue report:** Open the Starter project and type one task search, then quickly replace it with another. The list can briefly jump back to an obsolete search after the input has changed. After leaving the search view, a delayed callback can still run. It should settle only on the latest query and stop old scheduled work.

Reproduce the fault, locate its cause in `src/useDebouncedValue.ts`, make a focused repair, and verify fast typing, clearing the input, no matches and unmounting. Keep the immediate input responsive and the selected task unchanged. Explain in one or two sentences why the repair works.

Hint 1: compare the lifetime of each timeout to the Effect's dependency changes.

Hint 2: retain the timeout ID and return a cleanup function that calls `clearTimeout` for that ID.

After attempting the task, compare with `Practice/L02/Solution/focus-desk` in this lecture folder. No solution video is needed.
