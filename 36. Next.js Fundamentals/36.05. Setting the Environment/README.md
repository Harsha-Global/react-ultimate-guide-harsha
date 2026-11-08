# Setting the Environment

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: START HERE.txt only — this lesson starts in an empty folder.
- Support: the supplied app/globals.css, tsconfig.json and .gitignore, copied into the new project in the video.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

A small Next.js application created from an empty folder: package.json with the dev, build, start and typecheck commands (private, ES modules), next.config.ts with React strict mode, the supplied strict tsconfig.json, .gitignore and global stylesheet, the root layout (app/layout.tsx) and the home page (app/page.tsx).

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

With `npm run dev -- --port 5336` running, open http://127.0.0.1:5336: the Catalog Routes heading and its paragraph appear. Change one word in app/page.tsx and save: the page updates without a reload. Then stop the server and check the production commands in the order above.
