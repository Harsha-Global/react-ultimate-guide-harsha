# Component Variants

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run dev` and open http://127.0.0.1:5190. Search for a name that does not exist: the empty result shows the compact Show all products button beside the outline Clear search button. Show all products returns all four products and focuses the search field. Clear search is disabled while the search is empty. Choose Dark in the Theme select: both variants use the theme's tokens. Tab to Clear search and press Enter.
