# Setting up Git

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the completed Booking Studio from the previous section, ready to be placed inside a repository folder.
- Completed/booking-studio: the same project at the end of the lecture: the same application, unchanged; in the lecture it is copied into C:\react\react-teaching-demos, which becomes the Git repository (git init -b main) with a repository-local name and email for its commits (git config --local). Keep it for the next lecture.

## Run

Create a repository folder in your React workspace (for example C:\react\react-teaching-demos) and copy booking-studio into it, so the application is the inner folder. Open the outer folder in VS Code. Run Git commands in the outer folder and application commands in booking-studio: `npm ci`, `npm run lint`, `npm run check:tests`, `npm run test:run` and `npm run build`. For the app, run `npm run api` and, in a second terminal in booking-studio, `npm run dev`, and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory; no real payments occur.

## Try it

Check Git with `git --version` and `git credential-manager --version`. Create the outer folder, copy booking-studio into it, open the outer folder in VS Code and run `git init -b main` there. Set your own name and email with `git config --local user.name "Your Name"` and `git config --local user.email "you@example.com"`, check them, and run `git status`: On branch main, No commits yet, booking-studio/ untracked.
