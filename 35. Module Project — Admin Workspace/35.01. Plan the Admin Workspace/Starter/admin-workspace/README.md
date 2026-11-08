# Admin Workspace — the completed Zustand section project

The Admin Workspace project as completed at the end of the Zustand section: the TanStack Table catalog with server search, sorting and pagination in the URL (nuqs), the fetched catalog in the TanStack Query cache, the display preferences in a small Zustand store persisted under admin-workspace-preferences, and the product editor. It does not include the independent display-format assignment solution.

## Run

Copy this admin-workspace folder's contents into a new working folder (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
