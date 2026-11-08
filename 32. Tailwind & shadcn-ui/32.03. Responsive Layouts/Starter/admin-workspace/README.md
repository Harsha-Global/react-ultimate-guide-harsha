# Admin Workspace — a utility-styled product catalog

The Admin Workspace project with a searchable product catalog styled only with Tailwind utility classes: the sample products in src/catalog.ts (images in public/assets/products), src/ProductCard.tsx with its availability label (In stock, Low stock, Unavailable) and price, and src/App.tsx with the labelled search field, the Clear search button (disabled while the search is empty), the "n of 4 products shown" status and the empty-result message.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
