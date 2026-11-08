# Connect Saved Views

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Support Files/saved-view.test.mjs: the saved-view tests, copied into tests in the lecture (`npm run test:saved-view`).
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the coding exercise Validate a Saved View (Instructions.txt) with its Starter and Solution (npm ci, then npm test in either folder).

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

`npm run test:saved-view` runs the five saved-view tests. With the API and the dev server running, open http://127.0.0.1:5190: search studio, sort by price and Save this view. Search travel: the summary still says studio. Apply saved view: the address and table return to studio, sorted by price, on page one. Press Back to return to travel, then reload: the snapshot is still available.
