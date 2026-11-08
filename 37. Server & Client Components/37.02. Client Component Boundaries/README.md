# Client Component Boundaries

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the Component Workshop app as completed in the previous lecture.
- Completed/component-workshop: the app at the end of this lecture. Keep it for the next lecture.

A small client component (components/SaveProduct.tsx, marked "use client") with its own saved state, used by the workbench page, which stays a Server Component together with the product story.

## Run

Copy the component-workshop folder into your React workspace (for example C:\react\component-workshop) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`. Do not run two servers on the same port or against the same .next folder.

## Try it

On /workbench, click the save button or press Space or Enter on it: it switches between Save and Saved and its pressed state changes. Reload: the choice is not kept yet (it lives in component state).
