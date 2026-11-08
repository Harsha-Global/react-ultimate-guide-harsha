# Utility Styling

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files: the prepared sample catalog src/catalog.ts and the product images in public/assets/products, copied into the project in the lecture. Copy the contents of Support Files/admin-workspace into your project folder (where package.json is), keeping the folder structure.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run dev` and open http://127.0.0.1:5190. Search for `lamp`: one product is shown. Search for a name that does not exist: the recovery message appears. Click Clear search: all four products return. Press Tab to reach the search field and then the button: each shows a visible focus outline, and Enter on the button clears the search.
