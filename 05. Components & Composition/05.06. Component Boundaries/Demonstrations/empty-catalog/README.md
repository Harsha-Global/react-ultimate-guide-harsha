# empty-catalog

`src/App.tsx` passes an empty array to the catalog instead of the movie data. The section and its summary still belong to MovieCatalog, so the footer reads Available movies: 0, while MovieList keeps its own empty case and reports No movies found.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
