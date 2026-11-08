# missing-root

Here `index.html` gives the container `id="missing-root"`, so the lookup for `root` in `src/main.tsx` finds nothing: refresh the page and the Console shows “Root element not found”. Change it back to `id="root"` and refresh to see the page return. A successful build does not detect this kind of DOM problem.

This is a complete isolated project, not a file to merge into main. Run `npm ci` once, then `npm run dev`. Run `npm run build` for the type check; deliberately invalid comparisons are expected to fail. Do not use this folder as the next lecture’s checkpoint.
