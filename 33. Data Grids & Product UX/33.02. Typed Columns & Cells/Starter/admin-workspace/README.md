# Admin Workspace — a TanStack Table product inventory

The Admin Workspace project with its product list rendered as a native HTML table by TanStack Table (@tanstack/react-table 9.2.8, installed with --save-exact): src/components/ProductTable.tsx defines the columns (Product, Category, Stock and an Actions display column that renders ProductActions) in a memoised array, creates the table with useTable (features, columns, data, getRowId returning each product id) and renders the caption, header groups and rows with FlexRender inside a named, keyboard-scrollable region; src/App.tsx passes the filtered products, the editing flag and the edit callback to it. The catalog service, search, editor, menus and theme are unchanged.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.
