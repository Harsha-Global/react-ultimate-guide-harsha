# shadcn Component Ownership

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Original CLI Output: the files the shadcn command created for this lecture (components.json, the package files and src/components/ui/button.tsx, input.tsx, label.tsx, with the license and provenance). The registry can change: compare your own output with these before keeping it.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run dev` and open http://127.0.0.1:5190. Search for a name that does not exist and click Show all products: all four products return and the search field is focused again. Search for `lamp` and click Clear search. Click the Search products label: the field receives focus. Choose Dark in the Theme select, then check a narrow width (390 px in the browser's device toolbar).
