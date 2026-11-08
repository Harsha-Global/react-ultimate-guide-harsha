# type-error-dev

Here `src/MovieSummary.tsx` declares `durationMinutes` as a `number` but assigns the string `'125'`. The development page still displays 125 minutes, yet `npm run check` reports TS2322 and `npm run build` stops at the same error before Vite builds anything. Remove the quotes to restore the number. A `dist` folder left from an earlier build is not a new successful build.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
