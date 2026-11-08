# Add Accessible Editing

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Support Files/slow-api.mjs: the slow-save catalog service (accepted writes wait five seconds), copied into server in the lecture and started with `npm run api:slow`.
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

Stop the regular API and run `npm run api:slow`, then `npm run dev`. Open a product's Actions menu and choose Edit product: focus is in the name field and Tab stays inside the dialog. Rename the lamp to Everyday Backpack and save: the draft stays with an error. Enter a unique name and save: for five seconds the fields are read-only, the buttons show Saving… and Escape leaves the dialog open; then the row updates. Open another edit and Cancel: focus returns to that row's Actions button. Stop the slow service and run `npm run api` to restore the original products.
