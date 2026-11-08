# Plan the Admin Workspace

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the completed Admin Workspace project from the Zustand section. Copy its contents into a new working folder, C:\react\admin-workspace-project (do not overwrite an earlier project).
- Client Brief.md: the client's brief for the module project (responsive shell, separate counts, saved view, accessible editing, selection and recovery).
- Resources/Client Design v1: the version one design references (Admin Workspace - v1 Reference.pdf with the desktop, mobile, editing and design-token pages; the PNG/SVG frames; the native Admin Workspace - Guided v1.fig to import into Figma; the Manrope and DM Sans fonts with their licences).
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API (check http://127.0.0.1:5191/api/health: {"status":"ok"}) and the dev server running, open http://127.0.0.1:5190. Search studio: the lamp and the headphones match. Clear the search, sort by price and go to the next page: the address shows ?sort=priceMinor&page=2. Choose Compact, then Comfortable, in Table density: the rows change while the results stay the same. Restart the API (Ctrl+C, `npm run api`) to restore the four original products.
