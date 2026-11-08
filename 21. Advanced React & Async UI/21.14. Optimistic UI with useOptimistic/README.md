# Optimistic UI with useOptimistic

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the review form that saves a review).
- Completed/booking-studio: the same project at the end of the lecture, with a temporary review shown while it is being saved (src/ReviewBoard.tsx: the pure addReviewPreview function, useOptimistic over the confirmed reviews, addOptimisticReview called in the form Action before the request, the confirmed list updated inside startTransition after success, the pending row with its Sending… badge, and the feedback hidden while a preview is shown). Keep it for the next lecture.
- Practice/L07: the Optimistic Actions exercise (Brief.md, Hints.md, Review.md, Starter and Solution; see Brief.md).
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Stop the service and run `npm run api:slow`, reload and open the Reviews tab. Enter a name and a review and click Post review: the review appears at once with a Sending… badge, then stays without the badge when the service accepts it, and the review text clears. Reload the page and open the Reviews tab: the saved review is still in the list. Post a review that contains a link (for example www.example.com): the temporary row appears and then disappears, and "Please remove links from your review and try again." appears with the text kept. Remove the link and post again: the review is added once.
