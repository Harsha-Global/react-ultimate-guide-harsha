# Server-Only Code

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the Component Workshop app as completed in the previous lecture.
- Demonstrations/Server-only import.txt: the two temporary lines that prove, in a separate copy, that a client import of the server-only module fails the build.
- Completed/component-workshop: the app at the end of this lecture. Keep it for the next lecture.

The dispatch lookup moved into a server-only module (lib/dispatch.server.ts with the server-only package), and the estimate component renders only the public result it receives.

## Run

Copy the component-workshop folder into your React workspace (for example C:\react\component-workshop) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`. Do not run two servers on the same port or against the same .next folder.

## Try it

/workbench shows the same dispatch estimate. To see the protection, follow Demonstrations/Server-only import.txt in a separate copy: `npm run build` rejects the server-only module in the client graph until both lines are removed again. `node scripts/dispatch-mode.mjs slow` (or `error`, `ready`), run in a second terminal from the same folder, switches the dispatch estimate fixture; leave it in `ready` mode afterwards.
