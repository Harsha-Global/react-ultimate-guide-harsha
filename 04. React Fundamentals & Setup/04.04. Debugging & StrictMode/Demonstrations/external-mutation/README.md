# external-mutation

Here `src/MovieSummary.tsx` increments a counter declared outside the component and displays it. After a clean page load in development the page shows "Render counter: 2": the output depends on how many times the function was called. The main project never has this counter.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
