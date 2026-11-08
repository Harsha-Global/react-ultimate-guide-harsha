# Server Components

The completed application is the exact source demonstrated in the video.

- Starter/component-workshop: the minimal Component Workshop app (package, TypeScript settings, root layout, home page and stylesheet).
- Support Files/data/spotlight.json: the sample product story, copied into the project in the video.
- Completed/component-workshop: the app at the end of this lecture. Keep it for the next lecture.

An async Server Component (components/SpotlightStory.tsx) that reads data/spotlight.json on the server, a workbench page (app/workbench/page.tsx) that renders it, and a Workbench link in the root layout.

## Run

Copy the component-workshop folder into your React workspace (for example C:\react\component-workshop) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000. Keep using localhost: 127.0.0.1 is a different browser-storage origin. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 3000`. Do not run two servers on the same port or against the same .next folder.

## Try it

Open http://localhost:3000/workbench: the studio desk lamp story appears. Change its title in data/spotlight.json while the development server runs and reload: the new title appears. Restore the title afterwards.
