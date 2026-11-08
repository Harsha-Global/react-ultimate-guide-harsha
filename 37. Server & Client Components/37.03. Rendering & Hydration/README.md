# Rendering & Hydration

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the Component Workshop app as completed in the previous lecture.
- Demonstrations/Faulty initializer.txt: the deliberately faulty first-render initializer, written in a separate copy to reproduce the hydration mismatch.
- Bug Demo/component-workshop: that faulty copy, for reference.
- Recording Support/Storage Failure Demo: an isolated copy whose storage adapter denies reads and writes, to check the recovery message (see its README.txt).
- Completed/component-workshop: the app at the end of this lecture. Keep it for the next lecture.

The save button remembers the choice in browser storage without a hydration mismatch: both renders start unsaved, the stored choice is restored after hydration while the button stays disabled, and a failed write keeps the in-memory choice with a status message.

## Run

Copy the component-workshop folder into your React workspace (for example C:\react\component-workshop) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`. Do not run two servers on the same port or against the same .next folder.

## Try it

On /workbench, save the lamp and reload: the saved choice returns without a hydration warning. Toggle it and reload again to check the unsaved choice too.
