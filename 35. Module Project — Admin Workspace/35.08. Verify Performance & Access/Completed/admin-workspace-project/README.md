# Admin Workspace — a reviewed workspace with a scale test

The Admin Workspace project after a focused review. tests/large-catalog.test.mjs builds a separate fixture of ten thousand products and asks the existing query function for page 1250 at four rows: the total is 10000, four rows come back (Fixture04996 to Fixture04999), and a search with no matches returns none. package.json adds the test:scale script (node --test). The browser still requests and renders only one page of two or four rows, so no client-side virtualization is needed. The rest of the project is unchanged.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
