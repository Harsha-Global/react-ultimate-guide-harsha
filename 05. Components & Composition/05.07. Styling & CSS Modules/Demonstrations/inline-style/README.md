# inline-style

`src/MovieCard.tsx` passes a style object straight to the article, beside the class names from the CSS module. The property is written as `backgroundColor`, and the bare `28` becomes 28 pixels of padding. The module version is what the lecture keeps.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
