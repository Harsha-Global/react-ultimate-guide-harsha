# 07.04. Connect Product Details - source code

Everything demonstrated in this lecture.

## Folders and files

- `product-explorer` - the project at the end of this lecture. `App` owns
  `selectedId` (`string | null`, starting as `null`), finds `selectedProduct`
  in the complete `products` collection and calculates `isSelectionVisible`
  from the visible products. `ProductGrid` receives `selectedId` and
  `onSelect`, compares ids for each card and forwards the callback;
  `ProductCard` has the View button (`type="button"`, `aria-pressed`) and the
  selected class; `ProductDetails` shows the selected product, the
  outside-filters notice when its card is filtered out, or the selection
  prompt. `src/index.css` is the prepared stylesheet.
  In the lecture the lookup line is written after the filter calculation;
  here it sits above it, which makes no difference to the result.
- `Bug Report.md` - BUG-01, the reported problem: the details disappeared when
  a filter hid the selected card.
- `Demonstrations/selection-bug` - a separate copy with that defect (the lookup
  searches the visible products): `README.md` has the steps to reproduce it,
  `Fix.diff` the one-line repair. It is a teaching copy; continue from
  `product-explorer`.
- `Changes.diff` - the complete change to the project in this lecture.
- `Practice/A01/Assignment.md` - the optional Favorites Filter assignment.
  Start from a copy of `product-explorer` (it is the assignment's starter) and
  keep the original as your guided baseline. The worked solution and its
  rubric come with the next lecture, Product Explorer Challenge.
- `Styles/product-explorer.css` - the prepared stylesheet for this lecture.
- `Setup Guide.md` - the commands and recovery steps.

## Running a project

Open the project folder in VS Code, then in its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm run dev` starts the Vite development server; open the Local address it
prints (normally http://localhost:5173) in Chrome. Only one project can use
that address at a time, so stop one server (Ctrl+C) before starting another.
`npm run build` checks the types and builds into `dist`; `npm run lint` runs
oxlint.
