# Save a Review

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the saved reviews loaded from the service).
- Completed/booking-studio: the same project at the end of the lecture, with the review form (src/ReviewBoard.tsx: the saved list kept separate from the controlled name and text, a form Action that posts the draft and reuses its client id when the same text is retried, the saved record added to the list only after the service accepts it, and the error or thank-you message), rendered by src/ReviewList.tsx when the reviews are ready. The supplied form fields (src/ReviewFields.tsx) are included. Keep it for the next lecture.
- Supplied/ReviewFields.tsx: the prepared review form fields, copied into src in the video.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Stop the service and run `npm run api:slow`, reload and open the Reviews tab. Enter a name and a review and click Post review: "Sending review…" shows and the controls are disabled until the service answers; then the review is added below the saved ones, the review text clears, the name stays and "Your review has been added. Thank you." appears. Post a review that contains a link (for example www.example.com): "Please remove links from your review and try again." appears, no review is added and the text stays. Remove the link and post again: the review is added once.
