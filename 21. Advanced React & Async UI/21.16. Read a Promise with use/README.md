# Read a Promise with use

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the optional session reminder).
- Completed/booking-studio: the same project at the end of the lecture, with the studio notice (src/studioNoticeResource.ts: one cached request promise for the page, an ordinary getter and an invalidation function; src/StudioNotice.tsx: StudioNotice reads the message with use, and StudioNoticePanel adds the Refresh notice button, an error boundary keyed by the attempt with Try notice again, and a Suspense loading message), rendered in src/App.tsx after the booking form. The supplied service update (server/index.mjs, GET /api/studio-notice) is included. Keep it for the next lecture.
- Supplied/Notice service/server/index.mjs: the service update with the studio notice, copied into the project in the video.
- Supplied/studioNoticeResource.ts: the prepared request helper (fetchStudioNotice), copied into src in the video and completed there.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Stop the service and run `npm run api:slow`, then reload: "Loading the studio notice…" shows, then the notice. Choose another session or show the session reminder: the notice stays. Click Refresh notice: a new loading message, then the notice. Stop the service and click Refresh notice: the error message and Try notice again appear while the rest of the page still works. Start the service again and click Try notice again: the notice returns.
