# zero-and

`src/App.tsx` renders `{resultCount && <p>Results found</p>}` with a count of 0. Logical AND returns the number 0, and React displays it inside the div.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
