# Load Saved Reviews

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the submit controls in a child component).
- Completed/booking-studio: the same project at the end of the lecture, with the saved reviews loaded from the service (src/ReviewList.tsx: an effect requests the list with an abort signal, explicit loading, ready and error states, and a retry button that starts another attempt). The supplied service update (server/index.mjs) and review helper (src/reviewApi.ts) are included. Keep it for the next lecture.
- Supplied/Review service/server/index.mjs: the service update with the review list, copied into the project in the video.
- Supplied/reviewApi.ts: the prepared review helper, copied into src in the video.
- Styles: the updated prepared stylesheet with the review form rules used in the next lecture (already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Open the Reviews tab: the two saved reviews appear. Stop the service, reload the page and open the Reviews tab again: an error message and the Try loading reviews again button appear. Start the service with `npm run api` and click the button: the reviews replace the error.
