# incorrect-import

Here `src/App.tsx` imports `MovieSummary` without braces, as if it were a default export. Run `npm run build` to see the type checker report that the module has no default export, then restore the braces (`import { MovieSummary } ...`) and build again.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
