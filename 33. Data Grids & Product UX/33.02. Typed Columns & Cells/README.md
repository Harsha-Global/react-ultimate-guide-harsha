# Typed Columns & Cells

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Type Check Demonstration.md: the temporary type check shown in the lecture (replace the price formatting with info.getValue().toUpperCase(), run npm run build, read TS2339 and TS6133, then restore it). It is not part of the completed project.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190: four rows with images, prices ($89.00, $79.00, $28.00, $129.00) and stock labels. Edit the lamp's stock to 5, then 4, then 0 and save each time: In stock, Low stock, then Unavailable, and its Review availability dialog agrees. Search for one product and open its Actions menu. Check Dark and Light, and at 390 px (the browser's device toolbar) click the table, scroll it with the arrow keys, then press Tab and Enter to open a row's Actions menu. Restart the API to restore the sample data.
