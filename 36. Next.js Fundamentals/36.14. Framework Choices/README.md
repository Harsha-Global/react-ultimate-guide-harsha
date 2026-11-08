# Framework Choices

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes and Completed/catalog-routes: the finished Catalog Routes app (this lecture changes no project file).
- Practice: the Shareable Stock Filter assignment (an In stock only filter kept in the address), with its own Starter, Solution, instructions and worked answers.

This lecture compares framework choices (the Next.js App Router used here, React Router's Framework Mode and TanStack Start) against an application's requirements; the Catalog Routes app is unchanged.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

For the assignment, read the Instructions.txt of the Shareable Stock Filter folder in Practice, then open its Starter folder as a separate project: run `npm ci`, then `npm run dev -- --port 5338` and open http://127.0.0.1:5338/catalog. `npm test` shows the intentionally failing stock parser tests. Compare the Solution only after your attempt (stop the Starter server first; the Solution needs its own `npm ci`).
