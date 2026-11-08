# Redux & Request Isolation

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the core Component Workshop as completed in the Provider Placement lecture (the shortlist kept in context).
- Completed/component-workshop-redux: the app at the end of this lecture.

A separate Redux Toolkit version of the shortlist: a store factory (lib/shortlistStore.ts, makeShortlistStore) instead of a shared module-level store, a provider that creates its own store once from the initial values, and a store isolation test.

## Run

Copy the component-workshop-redux folder into your React workspace (for example C:\react\component-workshop-redux) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`; `npm test` runs the tests in the tests folder. Do not run two servers on the same port or against the same .next folder.

## Try it

On /workbench the shortlist starts with the lamp selected on the server and in the browser, without a hydration warning; toggling changes only this store. `npm test` proves that two stores do not share state.
