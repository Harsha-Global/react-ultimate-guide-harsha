# Admin Workspace — the guided workspace, unchanged beside the reviewed solution

The Admin Workspace project is unchanged in this lecture: it is the project you continue from the verification lecture. The lecture reviews the independent Saved Table View solution in Solution/admin-workspace: savedView.ts adds a validated density field, lists the URL fields explicitly in viewUpdate and migrates the version 1 envelope with migrateSavedView; savedViewStore.ts persists format 2 with that migration; useCatalogView.ts captures the live density in currentView and applies a saved density through setDensity; SavedViewBar.tsx shows the saved density.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
