# 07.01. Plan Product Explorer - source code

Everything demonstrated in this lecture.

## Folders and files

- `Client Brief.md` - Emily's request, the agreed requirements R1-R6 and the
  clarification agreed before implementation: a selected product stays in
  the details area, with an outside-filters notice, when the filters hide
  its card.
- `Acceptance Checklist.md` - the planned checks for each requirement.
- `Wireframes` - `Product Explorer - v1.fig`, the complete editable design
  with all five frames (Desktop - Catalog, Desktop - Selected, Desktop -
  Empty, Desktop - Hidden selection, Mobile - Catalog), plus PDF, PNG and SVG
  references. `Wireframes/README.md` explains how to import the .fig file
  into your own Figma account (the file browser's More > Import).
- `Styles/product-explorer.css` - the prepared stylesheet. The lecture copies
  its complete contents into `product-explorer/src/index.css`.
- `product-explorer` - the starter as this lecture leaves it:
  - the familiar React, TypeScript and Vite setup (`package.json`);
  - `src/App.tsx` shows the page heading and the goal;
  - `src/main.tsx` mounts `<App />` and imports `./index.css`;
  - `src/types.ts` declares the readonly `Product` type;
  - `src/products.ts` holds the local six-product collection, with its
    illustrations in `src/assets`;
  - `src/index.css` is the prepared stylesheet.
- `Demonstrations/target-preview/product-explorer` - the finished preview
  shown in the lecture: select Trail Backpack, then choose Audio, and the
  details stay with the notice "This selection is outside the current
  filters."
- `Practice/Planning Check.md` - decide which values need state and which
  can be derived. `Practice/Answer.md` explains the answer; attempt the
  check first.
- `Setup Guide.md` - the commands and recovery steps.

## Running a project

Open `product-explorer` (or the target preview's folder) in VS Code, then in
its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm run dev` starts the Vite development server; open the Local address it
prints (normally http://localhost:5173) in Chrome. `npm run build` checks the
types and builds into `dist`; `npm run lint` runs oxlint.
