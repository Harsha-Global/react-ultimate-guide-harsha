# Fix an Empty Search Page

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Demonstrations/BUG35-01/admin-workspace: the bug demonstration. Copy it to its own working folder (for example C:\react\admin-workspace-search-bug), never over your project: searching from a later page can leave an empty page.
- Demonstrations/BUG35-01 Repaired/admin-workspace-search-bug: the same copy after the repair shown in the lecture.
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

The demonstration: copy Demonstrations/BUG35-01/admin-workspace to C:\react\admin-workspace-search-bug, open it in VS Code and run `npm ci`. Stop any other API or dev server first, then run `npm run api` and `npm run dev` in two terminals. Open http://127.0.0.1:5190/?page=2&size=2 and search travel: 0 shown of 1 matching products on page 2 of 1. In the browser's Network panel the products request asks for page=2 and the response holds an empty items array with a total of 1. In src/useCatalogView.ts change setQuery's update to `{ q, page: 1 }` and save: the same search now lands on page one with the travel mug, a price sort survives a new search, a selection clears, a search with no matches still says no products match, and a direct link beyond the last page still offers First page. `npm run test:view`, `npm run test:api`, `npm run build` and `npm run lint` pass. Stop the copy's terminals before returning to the project.
