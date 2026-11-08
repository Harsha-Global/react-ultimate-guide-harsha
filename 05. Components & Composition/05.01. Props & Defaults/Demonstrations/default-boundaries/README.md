# default-boundaries

`src/App.tsx` passes `rating={undefined}` to the first card and `rating=""` to the second. The first card shows the default, "Not rated"; the second keeps the empty string, so nothing follows its rating label.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
