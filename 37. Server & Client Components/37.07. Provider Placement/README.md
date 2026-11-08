# Provider Placement

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the Component Workshop app as completed in the previous lecture.
- Completed/component-workshop: the app at the end of this lecture. Keep it for the next lecture.

A route-local client provider (components/ShortlistProvider.tsx) placed around the related controls only, with a shortlist count and toggle button (components/ShortlistControls.tsx) that share one selection; the rest of the page stays on the server.

## Run

Copy the component-workshop folder into your React workspace (for example C:\react\component-workshop) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`; `npm test` runs the tests in the tests folder. Do not run two servers on the same port or against the same .next folder.

## Try it

On /workbench, toggle the lamp in the shortlist: the count and the button change together.
