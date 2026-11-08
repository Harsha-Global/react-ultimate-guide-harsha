# Hydration & Recovery

The completed application is the exact source demonstrated in the video.

- Starter/zustand-workspace: the Zustand workspace project as completed in the previous lecture.
- Support Files/Storage Support: src/preferenceStorage.ts (copied into src) and tests/storage.test.mjs (copied into tests): the storage health observer, the safe browser storage adapter and their checks.
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190/preferences-lab.html, click Load unreadable JSON and Open workspace: the warning explains that the saved display could not be restored while the table stays usable. Click Use default display: the warning disappears. Choose Compact and reload: it is restored normally. `npm run test:storage` runs the three storage checks.
