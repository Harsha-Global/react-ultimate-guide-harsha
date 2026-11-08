# Pagination & Row Selection

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Server Update: the updated query step (server/query-inventory.mjs with pagination), copied over the earlier file in the project's server folder in the lecture.
- Support Files/Verification: the updated API checks (tests/api.test.mjs), copied over the earlier copy in the project's tests folder in the lecture.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190: page 1 of 2 with two products. Select the lamp (the page checkbox shows a mixed state), then the whole page; go to page 2, select another product and return: 3 selected across pages. Sort by price: the selection stays. Search for a product: the page and the selection reset. Choose 4 rows per page. Use the keyboard on the checkboxes and page buttons, search for a name that does not exist, and check Dark, Light and the 390 px layout. `npm run test:api` checks the service.
