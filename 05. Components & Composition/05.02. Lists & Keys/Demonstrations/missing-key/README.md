# missing-key

`src/App.tsx` returns `<li>` without a key. The page still shows both cards, and React prints "Each child in a list should have a unique \"key\" prop." in the browser Console.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
