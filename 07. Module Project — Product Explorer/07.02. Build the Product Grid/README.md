# 07.02. Build the Product Grid - source code

Everything demonstrated in this lecture.

## Folders and files

- `product-explorer` - the project as this lecture leaves it:
  - `src/ProductCard.tsx` presents one product through a readonly `product`
    prop: an `<article>` with the image (empty `alt` text, explicit `width`
    and `height`), the category, the name heading, the price formatted with
    `toLocaleString("en-US")`, and the availability message, whose class
    changes its color while the text says In stock or Out of stock;
  - `src/ProductGrid.tsx` receives a readonly array of products, returns
    "No products match your filters." for an empty array, and otherwise maps
    each product to an `<li key={product.id}>` holding a `ProductCard`;
  - `src/App.tsx` imports the collection and renders the Products section
    with `<ProductGrid products={products} />`;
  - `src/index.css` is the prepared stylesheet.
- `Styles/product-explorer.css` - the prepared stylesheet the lecture copies
  into `src/index.css`.
- `Demonstrations/empty-grid/product-explorer` - the same project passing an
  empty array to the grid, to see the empty-array message.
- `Practice/Instructions.md` - add a seventh product, Weekend Tote, using the
  same data shape and a unique identifier. `Practice/Starter/product-explorer`
  is the project to change; `Practice/Solution/product-explorer` and
  `Practice/Solution Notes.md` show the answer. Attempt the task first.
- `Client Review.md` - the first implementation review against the v1
  wireframes (in 07.01's Wireframes folder).
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
