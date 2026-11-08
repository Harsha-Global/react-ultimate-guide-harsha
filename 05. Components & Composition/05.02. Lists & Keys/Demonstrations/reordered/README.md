# reordered

`src/movies.ts` lists Night Signals first and Skyward second; the ids are unchanged. The page follows the array, so the cards appear in the new order while each movie keeps its own id.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
