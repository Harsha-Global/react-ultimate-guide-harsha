# Configure the Release

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project at the end of the previous lecture (repository folder: RELEASE.md at the root, the application in booking-studio).
- Completed/booking-studio: the same project at the end of the lecture: the application with a public release label: .env.example and .env.production (VITE_RELEASE_LABEL=Course demo), src/release.ts (the label with the fallback "Local preview") and the footer in src/Shell.tsx showing the label and the sample-data note. Keep it for the next lecture.
- RELEASE.md: the release checklist at the repository root (beside booking-studio).

## Run

Copy the Completed folder's contents into your repository folder (for example C:\react\react-teaching-demos), so RELEASE.md sits at the repository root and the application is the inner booking-studio folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. For the app, run `npm run api` and, in a second terminal in booking-studio, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory; no real payments occur. Use your own GitHub repository for the remote steps.

## Try it

Run `npm run dev`: the footer shows Local preview. Stop it, run `npm run build` and `npm run preview`: the footer shows Course demo, the value the production build read from .env.production. The value is public text in the built JavaScript, never a secret.
