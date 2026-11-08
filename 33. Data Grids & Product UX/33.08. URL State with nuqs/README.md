# URL State with nuqs

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Verification: the view checks (tests/view.test.mjs), added to the project's tests folder in the lecture, with the test:view script in package.json.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190/?campaign=demo#catalog. Select a product, go to page 2 and sort by price: the address shows the sort, the page returns to 1 and the selection stays. Use the browser's Back and Forward buttons. Type a search (the address updates without new history entries), then reload: the same view returns, the selection does not. Try ?page=-1&size=500&sort=no&dir=no (safe fallback), ?page=99 (an empty page with First page) and a search with no matches. `npm run test:view` runs the view checks.
