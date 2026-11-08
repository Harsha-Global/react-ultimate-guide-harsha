# repeated-component

Here `src/App.tsx` places `<MovieSummary />` twice, so the page shows two Skyward summaries from one component definition. The main project keeps one occurrence.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
