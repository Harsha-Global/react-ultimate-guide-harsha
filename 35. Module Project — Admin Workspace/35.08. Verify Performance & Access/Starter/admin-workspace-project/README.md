# Admin Workspace — the workspace, unchanged while a search bug is repaired

The Admin Workspace project is unchanged in this lecture: it is the project at the end of the accessible editing lecture. The lecture reproduces a reported empty search page in a separate demonstration copy and repairs it there: in that copy's src/useCatalogView.ts, setQuery wrote only the q value, so a search started on a later page kept a page that the new result did not have. The repaired setQuery writes the search and page one in the same view update, { q, page: 1 }, still with replace history; sorting and page size are untouched.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
