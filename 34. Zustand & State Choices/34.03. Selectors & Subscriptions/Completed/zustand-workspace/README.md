# Admin Workspace — focused subscriptions and a display summary

The Zustand workspace project with a development-only subscription comparison and a display summary. subscriptions.html with src/subscription-demo.tsx renders three badges in React Profilers that log their updates (a density-only selector, the whole store and a two-field useShallow selector); the buttons call the actions through useWorkspaceStore.getState(). src/components/WorkspaceStatus.tsx selects density and summaryOpen together with useShallow (zustand/react/shallow) and renders "Display: … rows · overview shown/hidden"; src/App.tsx renders it below the catalog heading and controls. The production build still uses index.html only.

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.
