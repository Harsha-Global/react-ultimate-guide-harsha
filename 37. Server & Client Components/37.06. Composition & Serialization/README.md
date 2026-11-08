# Composition & Serialization

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the Component Workshop app as completed in the previous lecture.
- Support Files: the sample catalog (lib/catalog.ts) and the product preview test (tests/productPreview.test.mjs), copied into the project in the video.
- Practice: the Select Public Product Props coding exercise (a small TypeScript project with its own Starter, Solution and run guide).
- Completed/component-workshop: the app at the end of this lecture. Keep it for the next lecture.

A client disclosure (components/ProductDisclosure.tsx) composed by the server page around the server-rendered story (passed as children), and a public product preview (lib/productPreview.ts) that sends only the fields the browser needs.

## Run

Copy the component-workshop folder into your React workspace (for example C:\react\component-workshop) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`; `npm test` runs the tests in the tests folder. Do not run two servers on the same port or against the same .next folder.

## Try it

On /workbench, the disclosure button names the lamp and shows or hides the story. `npm test` checks that only the public product fields are selected.
