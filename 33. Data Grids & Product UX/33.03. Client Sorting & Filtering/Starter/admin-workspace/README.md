# Admin Workspace — typed columns and richer cells

The Admin Workspace project with typed TanStack Table columns: src/components/ProductTable.tsx creates a column helper (createColumnHelper with the features type and Product) and builds the memoised columns with columnHelper.columns: typed accessors for the name (an image, the name and the product id), the category, the price (Price (USD), the integer cents formatted by formatPrice) and the stock (rendered by src/components/StockCell.tsx: the unit count and an In stock, Low stock or Unavailable label), plus an Actions display column that renders ProductActions. The price and stock headers align right and the table is wider. The catalog service, search, editor, menus and theme are unchanged.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.
