# Build for Production

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project at the end of the previous lecture (repository folder: RELEASE.md at the root, the application in booking-studio).
- Completed/booking-studio: the same project at the end of the lecture: the same source, unchanged; the lecture builds it (`npm run build` → dist, which stays out of Git) and checks the built files with `npm run preview` and the supplied API. Keep it for the next lecture.
- RELEASE.md: the release checklist at the repository root (beside booking-studio).

## Run

Copy the Completed folder's contents into your repository folder (for example C:\react\react-teaching-demos), so RELEASE.md sits at the repository root and the application is the inner booking-studio folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. For the app, run `npm run api` and, in a second terminal in booking-studio, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory; no real payments occur. Use your own GitHub repository for the remote steps.

## Try it

In booking-studio run `npm run build` and look at dist (index.html, the hashed files in dist/assets, the copied fonts). Stop `npm run dev` and `npm run api` if they run, then `npm run preview` and open http://127.0.0.1:4173: the page loads, but the API requests fail. In a second terminal in booking-studio run `npm run api`, refresh the page and submit an individual Morning booking with sample details. Stop both with Ctrl+C.
