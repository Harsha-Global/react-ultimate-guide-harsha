# Selectors & Subscriptions

The completed application is the exact source demonstrated in the video.

- Starter/zustand-workspace: the Zustand workspace project as completed in the previous lecture.
- Support Files/Subscription Demo: subscriptions.html (copied into the project root) and src/subscription-demo.tsx (copied into src): a development-only comparison page, opened at /subscriptions.html while the dev server runs.
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190/subscriptions.html and the browser console. Ignore the mount messages, then click Toggle overview (whole-store and two-field updates), Choose compact (all three) and Choose compact again (whole-store only). Back at http://127.0.0.1:5190, change the density and the overview: the Display line follows both; Reset display restores all three.
