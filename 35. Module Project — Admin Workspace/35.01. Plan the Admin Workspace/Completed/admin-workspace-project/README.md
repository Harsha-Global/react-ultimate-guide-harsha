# Admin Workspace — the module project's starting point

The Admin Workspace project in its own working folder (admin-workspace-project), unchanged from the end of the Zustand section: the search, sorting, page and page size live in the URL (useCatalogView with nuqs), App passes them to buildCatalogQuery, useProducts fetches and caches the matching page with TanStack Query (the ["catalog", query] key, refreshed after an accepted edit), the shared display preferences (table density, overview) live in the small Zustand workspace store, and a product's unfinished name and stock stay in the ProductEditor form. The local catalog API keeps edits in memory only.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
