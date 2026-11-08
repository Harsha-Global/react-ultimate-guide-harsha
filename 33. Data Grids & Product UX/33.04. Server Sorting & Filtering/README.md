# Server Sorting & Filtering

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Server Update: the updated catalog service (server/catalog-api.mjs, replacing the earlier file, and server/query-inventory.mjs, new), copied into the project's server folder in the lecture.
- Support Files/Verification: the updated API checks (tests/api.test.mjs), copied over the earlier copy in the project's tests folder in the lecture.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190. Activate the Price (USD) heading ($28, $79, $89, $129 from the server), then search for `studio`: two rows, still in price order, while Catalog health counts all four products. Change the search quickly several times: the final rows match the final search. Search for a name that does not exist, then clear the search. Stop the API, sort again to see the error, restart the API and choose Retry catalog. Search for `lamp`, rename the lamp so its name no longer matches and save: the result refreshes. Sort with the keyboard, check Dark and Light and the 390 px layout. `npm run test:api` checks the service. Restart the API to restore the sample data.
