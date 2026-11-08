# Verify Direct Links and Recovery

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project at the end of the previous lecture (repository folder: RELEASE.md at the root, the application in booking-studio).
- Completed/booking-studio: the same project at the end of the lecture: the same application; RELEASE.md now records the hosted checks of the deployed commit. Keep it for the next lecture.
- RELEASE.md: the release checklist at the repository root (beside booking-studio).

## Run

Copy the Completed folder's contents into your repository folder (for example C:\react\react-teaching-demos), so RELEASE.md sits at the repository root and the application is the inner booking-studio folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. Production: after `npm run build`, run `npm start` and open http://127.0.0.1:4318 (the built app and its API from one Node process); `npm run verify:production` runs the supplied automated check on its own port. Development: `npm run api`, then `npm run dev` in a second terminal and http://127.0.0.1:5210. Demo bookings are kept in memory; no real payments occur. Use your own GitHub repository and your own Render service for the remote steps.

## Try it

On your deployed address: book a sample Morning visit, open the confirmation and reload it; replace the booking value with 00000000-0000-4000-8000-000000000000 to see the not-found recovery (Try again, Back to the studio); open /assets/missing-course-check.js and /api/reset with the Network panel open (both 404) and /api/health (200). Record the results in RELEASE.md.
