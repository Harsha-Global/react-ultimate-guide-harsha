# Verify Performance & Access

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Support Files/large-catalog.test.mjs: the scale test (a separate ten-thousand-record fixture), copied into tests in the lecture and run with `npm run test:scale`.
- Verification Checklist.txt: the review checklist used in the lecture (commands, browser checks, production preview and the finishing reset).
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

Run the commands in Verification Checklist.txt: `npm run test:scale` and the other test scripts, `npm run build` and `npm run lint`. With the API and the dev server running, check a saved studio view against a direct travel link, the clean-address restore, Table density and the overview, selection across pages and sorting, keyboard access to the search, table and row menus, the editor's focus and Cancel, Light and Dark, the locale and review time zone, and /motion-check.html?reduce=0. Stop the API before a save, a new search, or a refresh after more than thirty seconds to see the retained draft, Retry catalog and Retry refresh. Then stop the dev server, keep the API running, run `npm run preview -- --host 127.0.0.1 --port 5190` and repeat the saved-view and editing journey. Finish by restarting the API and using Forget saved view, Clear search and Reset display.
