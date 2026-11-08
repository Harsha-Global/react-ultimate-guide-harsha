# 07.05. Product Explorer Challenge - source code

Everything demonstrated in this lecture.

## Folders and files

- `Client Acceptance.md` - the client acceptance walkthrough: each agreed
  requirement (R1-R6), the stock-filter change CR-01 and the selection fix
  BUG-01, with the check that demonstrates it, and the handoff summary.
- `product-explorer` - the delivered project, unchanged from the end of
  Connect Product Details: search, category and In stock only filters, the
  product grid, and the selected product's details with the outside-filters
  notice.
- `Practice/A01` - the optional Favorites Filter assignment:
  - `Assignment.md` - the task, the acceptance criteria and the self-review
    prompts;
  - `Starter/product-explorer` - where to start (the same project as above);
  - `Solution/product-explorer` - the worked solution reviewed in this
    lecture: `App` owns `favoriteIds` and `favoritesOnly`,
    `handleToggleFavorite` removes an id with `filter` or adds it with array
    spread, and the filter gains
    `(!favoritesOnly || favoriteIds.includes(product.id))`; `ProductGrid`
    passes `isFavorite` and `onToggleFavorite` to each card; `ProductCard`
    has the favorite button with `aria-pressed` and the accessible name
    "Favorite <product name>"; `ProductFilters` has the Favorites only
    checkbox;
  - `Changes.diff` - the complete change from the starter to the solution;
  - `Review.md` - the rubric and the review sequence.
  Try the starter first, then compare the solution, the diff and the rubric.
- `Styles/product-explorer.css` - the prepared stylesheet; it already styles
  the favorite buttons and the extra checkbox.
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
