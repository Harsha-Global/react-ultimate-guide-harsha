# Build the Responsive Shell

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Support Files/Workspace Styles.css: the supplied stylesheet that replaces src/index.css in the lecture.
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190 and press Tab: Skip to catalog appears; press Enter and the Product catalog heading receives focus. Switch the theme between Light and Dark. In DevTools' device toolbar (about 390 px wide) the overview and the catalog stack, the controls wrap and the table scrolls inside its own region.
