# Redirects & Revalidation

The routed-directory folder contains the exact source recorded in this lecture. A successful edit waits for the API update, then returns a redirect to the saved employee detail page. Validation and API failures return an error and the submitted values while the draft remains editable.

Use Node22.22.0 or newer. In routed-directory run npm ci. Open two terminals in that folder: run npm run api in the first and npm run dev in the second. Open http://127.0.0.1:5183. The API uses port4183; both ports must be free. The development server proxies /api requests to the local API.

The API starts with sample employees and keeps edits in memory. Restarting it restores the seed data. Role wording in your run can differ from the recording; enter your own demonstration role. For the failed-save exercise, load the healthy form first, change the draft, stop only the API terminal, and save. Restart that API and retry without reloading the form. Keep the development server running.

Check the source with npm run check, npm run lint -- src api, and npm run build. The scoped lint command checks this milestone rather than installed dependencies. Dependencies, build output, narration and production assets are excluded from this archive.
