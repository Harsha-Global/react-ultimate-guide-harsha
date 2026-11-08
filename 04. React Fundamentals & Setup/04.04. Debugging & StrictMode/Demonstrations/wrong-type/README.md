# wrong-type

Here `src/MovieSummary.tsx` declares `durationMinutes` as a `number` but assigns the string `'125'`. VS Code marks the assignment and `npm run build` stops with TS2322. Remove the quotes, save, and build again.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
