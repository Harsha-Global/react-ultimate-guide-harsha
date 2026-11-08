# Zustand & Hydration

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the core Component Workshop as completed in the Provider Placement lecture (the shortlist kept in context).
- Support Files: the validated browser storage adapter (lib/shortlistPersistence.ts) and the store isolation test (tests/storeIsolation.test.mjs), copied into the project in the video.
- Recording Support/Storage Failure Demo: an isolated copy whose storage adapter denies reads and writes, to check the recovery message (see its README.txt).
- Practice: the Independent Comparison Lists assignment, with its own Starter, Solution, instructions, run guide and worked answers (port 3382).
- Completed/component-workshop-zustand: the app at the end of this lecture.

A separate Zustand version of the shortlist: a store factory with the persist middleware and skipHydration, restored explicitly after the first render by the provider, with the controls disabled until restoration finishes and a message when browser storage is unavailable.

## Run

Copy the component-workshop-zustand folder into your React workspace (for example C:\react\component-workshop-zustand) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`; `npm test` runs the tests in the tests folder. Do not run two servers on the same port or against the same .next folder.

## Try it

On /workbench, select and clear products and reload: the saved list (an empty one too) returns after hydration. `npm test` checks the store isolation.
