# missing-required-prop

`src/App.tsx` leaves out the required `title` prop on the first card. `npm run check` and `npm run build` report TS2741: Property 'title' is missing.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
