# Admin Workspace — a shareable catalog view

The Admin Workspace project with its search, sort, page and page size in the URL, using nuqs 2.10.2 with React Router 8.4.0 (installed with --save-exact): src/main.tsx wraps App in NuqsAdapter inside BrowserRouter; src/viewParsers.ts parses q, sort, dir, page and size with typed parsers and defaults (invalid values fall back safely); src/useCatalogView.ts reads them with useQueryStates, derives the table's sorting, filters and pagination, resets the page with a search (replace history) and records sort and page changes as history entries (push). src/App.tsx uses the hook, keeps row selection local and tied to the current search, and clears it after a save. Unrelated query parameters and the fragment are preserved. tests/view.test.mjs checks the view parsing (`npm run test:view`).

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.
