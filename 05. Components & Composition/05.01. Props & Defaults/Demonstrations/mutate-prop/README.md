# mutate-prop

`src/MovieCard.tsx` assigns to `props.title`, a read-only property. `npm run check` and `npm run build` report TS2540: Cannot assign to 'title' because it is a read-only property.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
