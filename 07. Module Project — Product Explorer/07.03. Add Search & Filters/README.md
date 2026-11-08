# 07.03. Add Search & Filters - source code

Everything demonstrated in this lecture.

## Folders and files

- `product-explorer` - the project as this lecture leaves it:
  - `src/App.tsx` keeps `query`, `category` (starting at `"all"`) and
    `inStockOnly` (starting at `false`) state, derives `visibleProducts` from
    the products with three conditions joined by `&&` (the lowercase name
    includes the trimmed, lowercase search text; the category is `"all"` or
    matches; the option is off or the product is in stock), shows
    "Products found" from the array's length and passes the array to
    `ProductGrid`;
  - `src/ProductFilters.tsx` has the labelled search input, the category
    select and the In stock only checkbox; each reports its value through a
    callback prop (`onQueryChange`, `onCategoryChange`, `onInStockChange`);
  - `src/index.css` is the prepared `Styles/product-explorer.css`.
- `Demonstrations/search-category/product-explorer` - the stage before the
  client change: search and category only, styled with
  `Styles/search-category.css`. `Demonstrations/CR-01.diff` is the change
  that adds the In stock only checkbox.
- `Client Change.md` - Emily's change request CR-01, the agreed behavior and
  the acceptance checks.
- `Wireframes` - `Product Explorer - v2.fig`, the revised design with its four
  frames (Desktop - Stock filter, Desktop - Combined filters, Desktop -
  Retained selection, Mobile - Stock filter), plus PDF, PNG and SVG copies.
- `Styles` - the two prepared stylesheets: `search-category.css` for the
  first stage, `product-explorer.css` after the checkbox is added.
- `Practice/Instructions.md` - add a Clear filters button that resets the
  three choices through one callback prop. `Practice/Starter/product-explorer`
  is the project to change; `Practice/Solution/product-explorer` and
  `Practice/Solution Notes.md` show the answer. Attempt the task first.
- `Setup Guide.md` - the commands and recovery steps.

## Running a project

Open the project folder in VS Code, then in its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm run dev` starts the Vite development server; open the Local address it
prints (normally http://localhost:5173) in Chrome. `npm run build` checks the
types and builds into `dist`; `npm run lint` runs oxlint.
