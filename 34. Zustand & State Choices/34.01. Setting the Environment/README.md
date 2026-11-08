# Setting the Environment

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project from the previous section. Copy its contents into a new working folder, C:\react\zustand-workspace (do not overwrite an earlier project).
- Support Files/Density Styles.css: the two compact-density rules appended to src/index.css in the lecture.
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API (check http://127.0.0.1:5191/api/health: {"status":"ok"}) and the dev server running, open http://127.0.0.1:5190. Choose Compact in Table density: the rows become tighter while their prices and stock values stay the same. Switch back to Comfortable, then use the keyboard (focus the select, Up and Down). Reload: the density returns to Comfortable.
