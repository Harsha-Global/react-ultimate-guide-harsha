# Admin Workspace — an accessible catalog table

The Admin Workspace project with a reviewed catalog table: src/components/ProductTable.tsx keeps the native table (caption, column headers with scope="col", sortable headings as buttons with aria-sort on the sorted header), renders each product name as a row header (th scope="row"), links a visible explanation of the sort cycle and the page selection scope with aria-describedby (useId), sets aria-rowcount from the matching total and aria-rowindex for the header row and each data row of the current page, and keeps one persistent, atomic status message for the result, page and selection (or loading / unavailable); src/App.tsx no longer adds a separate loading status. The save confirmation and the error alert are unchanged.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.
