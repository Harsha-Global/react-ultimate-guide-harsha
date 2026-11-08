# Deploy the Demo

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project at the end of the previous lecture (repository folder: RELEASE.md at the root, the application in booking-studio).
- Completed/booking-studio: the same project at the end of the lecture: the same application, now merged to main through a reviewed pull request and deployed as a free Render web service (Node, branch main, root directory booking-studio, build `npm ci && npm run build`, start `npm start`, health check /api/health, Auto-Deploy off). Keep it for the next lecture.
- RELEASE.md: the release checklist at the repository root (beside booking-studio).

## Run

Copy the Completed folder's contents into your repository folder (for example C:\react\react-teaching-demos), so RELEASE.md sits at the repository root and the application is the inner booking-studio folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. Production: after `npm run build`, run `npm start` and open http://127.0.0.1:4318 (the built app and its API from one Node process); `npm run verify:production` runs the supplied automated check on its own port. Development: `npm run api`, then `npm run dev` in a second terminal and http://127.0.0.1:5210. Demo bookings are kept in memory; no real payments occur. Use your own GitHub repository and your own Render service for the remote steps.

## Try it

Commit the production changes on a branch, open and merge a pull request into main, then create your own free Render web service from your repository with the settings above, deploy it, open its public address and check the footer label and /api/health.
