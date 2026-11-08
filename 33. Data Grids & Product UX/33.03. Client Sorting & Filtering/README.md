# Client Sorting & Filtering

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190. Activate the Price (USD) heading: $28, $79, $89, $129; again for descending, again to return to the original order. Sort by Stock, then search for `  LAMP  `: one row. Search for a name that does not exist and choose Show all products: focus returns to the search field and the stock order stays. Edit the lamp's stock to 20 and save: it moves to its new sorted position. Clear sorting, then use the keyboard on the heading buttons and a row's Actions menu, in Dark and Light and at 390 px (the browser's device toolbar). Restart the API to restore the sample data.
