# 10.08. Debouncing with Custom Hooks

The input query updates immediately; useDebouncedValue delays the value used to filter the task rows by 350 ms. Each new value cancels its obsolete timeout. Filtering does not change the selected-task lookup or open-task count, and no network request is made.

## Projects

- focus-desk: completed lecture checkpoint.
- Starter/focus-desk: completed 10.07 checkpoint for following along.
- Practice/L02/Starter/focus-desk: supplied missing-cleanup exercise.
- Practice/L02/Solution/focus-desk: supplied repaired exercise.

Read Practice/L02/Task.md before the solution. Each project runs independently with npm ci and npm run dev. npm run check, npm run lint and npm run build verify the source. Stop the previous server before switching projects. Dependencies, builds, narration and production artifacts are excluded.
