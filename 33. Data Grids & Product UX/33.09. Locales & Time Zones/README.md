# Locales & Time Zones

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Verification: the formatting checks (tests/formats.test.mjs), added to the project's tests folder in the lecture, with the test:formats script in package.json.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190. Under Display preferences choose German: the table and the review dialog show 89,00 $; sorting by price keeps the numeric order. Switch the review time zone from UTC to Asia/Kolkata (15 Jan 2027, 06:00) and America/New_York (14 Jan 2027, 19:30); inspect the time element: its datetime stays 2027-01-15T00:30:00Z. `npm run test:formats` runs the formatting checks. Check both themes and the 390 px layout with the keyboard.
