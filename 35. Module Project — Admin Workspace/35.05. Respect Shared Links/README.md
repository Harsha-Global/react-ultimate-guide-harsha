# Respect Shared Links

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Client Change.md: the client's change request (a saved view restores on a clean address; a shared link always wins).
- Resources/Client Design v2: the version two design references (page 4 of Admin Workspace - v2 Reference.pdf shows the shared-link rules; the native .fig, PNG/SVG frames and fonts).
- Support Files/saved-view.test.mjs: the updated saved-view tests (it replaces tests/saved-view.test.mjs in the lecture).
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

`npm run test:saved-view` runs the seven saved-view tests. With the API and the dev server running, save a studio view, open http://127.0.0.1:5190/?q=travel and reload: travel stays. Open http://127.0.0.1:5190: the saved studio view is restored. Clear the search: it stays cleared. Open http://127.0.0.1:5190/?q=: all products remain. Apply the saved view and press Back to return to the previous address.
