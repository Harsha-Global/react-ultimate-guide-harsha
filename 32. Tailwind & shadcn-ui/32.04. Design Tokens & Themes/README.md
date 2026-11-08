# Design Tokens & Themes

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Verification: the supplied theme checks (tests/theme.test.mjs), copied into the project in the lecture. Copy the tests folder into your project folder (where package.json is).
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the Resolve the Theme Preference coding exercise (Instructions, Starter, Solution).

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run dev` and open http://127.0.0.1:5190. Choose Dark in the Theme select and reload: Dark stays selected. Choose Light and check the labels, the search field, the button and the keyboard-focus outline (Tab). Choose System and reload: the select still says System and the colours follow the device setting. Run `npm run test:theme`: 6 theme behavior checks pass.
