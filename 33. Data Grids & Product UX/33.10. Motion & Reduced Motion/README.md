# Motion & Reduced Motion

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/motion-verification: the motion check page (motion-check.html) and its verification folder, copied into the project root in the lecture (tsconfig.app.json includes verification).
- Support Files/Verification: the motion checks (tests/motion.test.mjs), added to the project's tests folder in the lecture, with the test:motion script in package.json.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

With the API and the dev server running, open a product's review dialog from its Actions menu: the details rise in briefly; Tab and Shift+Tab stay inside the dialog, Escape and Done return to the catalog. Open http://127.0.0.1:5190/motion-check.html?reduce=0, open the details and read the captured samples; then tick Simulate reduced motion and open again (only the final state). Press R while the dialog is open to switch the simulated preference. `npm run test:motion` runs the preference checks; `npm run build` builds the app.
