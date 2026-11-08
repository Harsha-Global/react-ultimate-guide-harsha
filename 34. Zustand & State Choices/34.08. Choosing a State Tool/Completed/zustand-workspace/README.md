# Admin Workspace — choosing a state tool (the project is unchanged from the previous lecture)

This lecture compares state tools from the project's requirements; the code is the same as at the end of the previous lecture. The unfinished product name belongs to the edit form, the active search and page to the URL (nuqs), the fetched product records to the TanStack Query cache (the ["catalog", query] key), and the density and overview choices to the small Zustand store, with a validated snapshot persisted in localStorage under admin-workspace-preferences. The display-status line is derived during rendering. Pressing Back after changing the search restores the earlier search from the URL, and the request key follows it.

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
