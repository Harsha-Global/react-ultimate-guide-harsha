# unclosed-tag

Here the first paragraph in `src/App.tsx` has no closing `</p>`, so Vite reports a syntax error that points at the next closing tag. Restore the closing `</p>`, save, and the page renders again.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
