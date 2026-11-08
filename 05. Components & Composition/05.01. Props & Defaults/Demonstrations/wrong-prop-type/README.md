# wrong-prop-type

`src/App.tsx` passes `durationMinutes="125"`, a string, to a prop declared as a number. `npm run check` and `npm run build` report TS2322.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
