# Stores & Actions

The completed application is the exact source demonstrated in the video.

- Starter/zustand-workspace: the Zustand workspace project as completed in the previous lecture.
- Support Files/Verification/tests: the course test files; workspace.test.mjs is copied into the project's tests folder in the lecture (the others are already there).
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190. Choose Compact, then Hide overview: the table keeps its compact rows and uses the full width. Show overview: the density is unchanged. Search for `lamp`, hide the overview and click Reset display: the overview returns and the density is Comfortable again, while the search stays. Try the buttons with the keyboard too. `npm run test:workspace` runs the two store checks.
