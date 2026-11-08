# Queries & Shared UI State

The completed application is the exact source demonstrated in the video.

- Starter/zustand-workspace: the Zustand workspace project as completed in the previous lecture.
- Support Files/Query Tests/tests/query-cache.test.mjs: the query cache tests, copied into tests in the lecture (`npm run test:query`).
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190. Search studio, then travel, then studio again within 30 seconds: the cached studio rows return at once. Edit a product and save: the rows and the catalog counts refresh. Stop the API and search a term you have not opened (for example mug): the first-load error with Retry catalog appears; restart the API and retry. Load studio, wait more than 30 seconds, stop the API, switch to another search and back: the studio rows stay visible with the refresh-failed alert; restart the API and click Retry refresh. `npm run test:query` runs the three cache tests.
