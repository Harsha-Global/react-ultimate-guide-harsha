# Review a Pull Request

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the first checkpoint from the previous lecture (the application committed in the repository).
- Completed/booking-studio: the same project at the end of the lecture: the same application, unchanged; the lecture pushes the repository to a new private GitHub repository and adds RELEASE.md at the repository root through the branch codex/release-checklist and a reviewed pull request. Keep it for the next lecture.
- RELEASE.md: the release checklist at the repository root (beside booking-studio).

## Run

Copy the Completed folder's contents into your repository folder (for example C:\react\react-teaching-demos), so RELEASE.md sits at the repository root and the application is the inner booking-studio folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. For the app, run `npm run api` and, in a second terminal in booking-studio, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory; no real payments occur. Use your own GitHub repository for the remote steps.

## Try it

Create your own empty private repository on GitHub and copy its HTTPS address. In the repository folder: `git remote add origin <your address>`, `git remote -v`, `git push -u origin main` (Git Credential Manager signs in through the browser). Then `git switch -c codex/release-checklist`, add RELEASE.md, `git add RELEASE.md`, `git diff --staged`, `git commit -m "Document Booking Studio release checks"` and `git push -u origin codex/release-checklist`. Open a pull request into main on GitHub, review Files changed and merge it, then `git switch main` and `git pull --ff-only`.
