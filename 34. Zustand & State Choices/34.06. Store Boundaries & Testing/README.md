# Store Boundaries & Testing

The completed application is the exact source demonstrated in the video.

- Starter/zustand-workspace: the Zustand workspace project as completed in the previous lecture.
- Support Files/Store Tests/tests: workspace.test.mjs (replaces the earlier copy in tests) and memory-storage.mjs (added to tests): the store tests with a fresh in-memory storage adapter per test.
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the local task Shared Store Leakage (Instructions.txt) with its independent Starter, the complete Solution and Solution Explanation.txt (npm ci, then npm run test:leak in the Starter copy).

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

`npm run test:workspace` runs the five store tests (5 pass); they use in-memory storage, so no server or browser is needed. With the API and the dev server running, open http://127.0.0.1:5190, choose Compact and reload: the density is still restored from the browser store.
