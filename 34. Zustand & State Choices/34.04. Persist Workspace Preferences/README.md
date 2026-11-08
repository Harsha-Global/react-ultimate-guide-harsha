# Persist Workspace Preferences

The completed application is the exact source demonstrated in the video.

- Starter/zustand-workspace: the Zustand workspace project as completed in the previous lecture.
- Support Files/Storage Fixtures: preferences-lab.html (copied into the project root) and src/preferences-lab.tsx (copied into src): a development-only page that replaces only the admin-workspace-preferences storage entry.
- Support Files/Verification/tests: the course test files; preferences.test.mjs is added and workspace.test.mjs replaces the earlier copy in the lecture.
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the coding exercise Migrate Workspace Preferences (Instructions.txt) with its independent Starter and Solution (npm ci, then npm test in either folder).

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190, choose Compact and Hide overview, then reload: both return. Open http://127.0.0.1:5190/preferences-lab.html, click Load old preferences and Open workspace: compact rows with the overview hidden (migrated). Load invalid values and open the workspace again: the safe defaults. `npm run test:preferences` runs the four checks and `npm run test:workspace` still passes.
