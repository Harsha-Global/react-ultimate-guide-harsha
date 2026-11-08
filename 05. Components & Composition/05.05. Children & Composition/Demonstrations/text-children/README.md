# text-children

`src/App.tsx` passes ordinary text to the second panel instead of a paragraph element. The Panel component still displays it, because `children` is typed as `ReactNode`.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
