# Table Accessibility

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the earlier table lectures (the Virtual List Lab lecture left it unchanged).
- Support Files/Table Review.txt: the review walkthrough used in the lecture (structure, sorting, page context, selection, status, narrow layout, actions).
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190. Tab to a product checkbox and press Space (the page checkbox shows a mixed state), move to the next page with the keyboard (the selection count keeps the earlier choice), and try Previous page while it is unavailable. Sort a heading with Enter or Space: focus stays on it. Open a row's Actions menu, the review dialog and close it with Escape; open the editor, clear the name, save to see the message, then cancel (focus returns to the search). In the browser's Elements view, check the row header and aria-rowindex. Check Dark, Light and the 390 px layout.
