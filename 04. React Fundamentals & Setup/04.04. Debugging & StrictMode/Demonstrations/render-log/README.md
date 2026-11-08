# render-log

Here `src/MovieSummary.tsx` logs "MovieSummary render" each time the function runs. Clear the Console and reload the page: with `<StrictMode>` in development you see two render messages while the page shows one article. Hot updates and DevTools settings can affect how the Console presents them.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
