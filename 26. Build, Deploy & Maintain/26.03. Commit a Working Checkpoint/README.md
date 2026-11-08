# Commit a Working Checkpoint

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the project as set up in the previous lecture (inside the repository folder, not yet committed).
- Completed/booking-studio: the same project at the end of the lecture: the same application, unchanged: in the lecture it is installed and checked (npm ci, lint, test types, tests, build), staged with `git add booking-studio`, reviewed with `git diff --staged` and saved as the first commit "Save tested Booking Studio checkpoint". Keep it for the next lecture.

## Run

Create a repository folder in your React workspace (for example C:\react\react-teaching-demos) and copy booking-studio into it, so the application is the inner folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. For the app, run `npm run api` and, in a second terminal in booking-studio, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory; no real payments occur.

## Try it

In the repository folder, run the checks in booking-studio, then `git add booking-studio`, `git diff --staged --stat`, `git diff --staged` (press q to leave the pager) and `git commit -m "Save tested Booking Studio checkpoint"`; `git status` then reports a clean working tree and `git log --oneline -1` shows the commit.
