# TanStack Table Setup

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190: four rows. Search for `lamp`: one row, while Catalog health still counts all four products. Open the lamp's Actions menu, choose Review availability and close the dialog with Escape. Edit the lamp's stock and save: the row changes after the service accepts it. Search for a name that does not exist, then Show all products. Check Dark and Light, and at 390 px (the browser's device toolbar) click the table and use the arrow keys to scroll it horizontally.
