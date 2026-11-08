# boolean-and

`src/App.tsx` renders `{resultCount > 0 && <p>Results found</p>}` with the same count. The comparison produces false, which React omits, so the div stays empty.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
