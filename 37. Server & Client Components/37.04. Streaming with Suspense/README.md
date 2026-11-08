# Streaming with Suspense

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the Component Workshop app as completed in the previous lecture.
- Support Files: the dispatch timing fixture (data/dispatch-mode.json) and its switch (scripts/dispatch-mode.mjs), copied into the project in the video.
- Completed/component-workshop: the app at the end of this lecture. Keep it for the next lecture.

A slow server component (components/DispatchEstimate.tsx) streamed inside its own Suspense boundary with a waiting message, and a workbench error boundary (app/workbench/error.tsx) with a retry.

## Run

Copy the component-workshop folder into your React workspace (for example C:\react\component-workshop) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`. Do not run two servers on the same port or against the same .next folder.

## Try it

In a second terminal (from the same folder) run `node scripts/dispatch-mode.mjs slow` and reload /workbench: the story and save button appear at once while the estimate shows its waiting message. With `node scripts/dispatch-mode.mjs error` the error boundary offers a retry; run `node scripts/dispatch-mode.mjs ready` and retry. Leave the fixture in ready mode.
