# Admin Workspace — the guided workspace, unchanged for the saved-density challenge

The Admin Workspace project is unchanged in this lecture: it is the reviewed project from the verification lecture. The lecture introduces an independent assignment in Practice: extend the saved table view so it also captures the table density chosen when the view was saved, while the live density stays in the workspace store and density never enters the URL update.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
