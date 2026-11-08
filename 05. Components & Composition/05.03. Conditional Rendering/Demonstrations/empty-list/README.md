# empty-list

`src/App.tsx` passes an empty array to MovieList. The early return takes over, so the page shows "No movies found." instead of the list.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
