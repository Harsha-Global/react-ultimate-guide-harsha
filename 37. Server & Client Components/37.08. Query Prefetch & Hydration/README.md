# Query Prefetch & Hydration

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the core Component Workshop as completed in the Provider Placement lecture (the shortlist kept in context).
- Support Files: the sample stock API (scripts/sample-api.mjs), its mode switch (scripts/api-mode.mjs) and data/api-mode.json, copied into the project in the video.
- Completed/component-workshop-query: the app at the end of this lecture.

TanStack Query added to a separate copy of the core project: a request-local server QueryClient prefetches the lamp's stock, dehydrates it into a HydrationBoundary, and the client panel (components/LiveStock.tsx) starts from that result and refreshes it through the next.config.ts rewrite to the sample API.

## Run

Copy the component-workshop-query folder into your React workspace (for example C:\react\component-workshop-query) and open it in VS Code. This version also uses a local sample stock API: in a first terminal run `npm ci`, then `npm run api:reset` and `npm run api` (it listens on http://127.0.0.1:5211; http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`; `npm test` runs the tests in the tests folder. Do not run two servers on the same port or against the same .next folder. Stop both processes when you finish.

## Try it

With the API and the app running, open /workbench: the stock panel shows the server-loaded value without an immediate second request. Run `node scripts/api-mode.mjs stock P-101 7` and refresh the panel: the new value appears. `npm run api:error` then refresh keeps the cached value with an error message; `npm run api:ready` recovers.
