# lazy & Suspense

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the materials help).
- Completed/booking-studio: the same project at the end of the lecture, with the review list loaded on request (src/ReviewsPanel.tsx: ReviewList declared with lazy, the Read workshop reviews button, a Suspense loading fallback inside the error boundary, and a reload fallback for a failed load). Keep it for the next lecture.
- Demonstrations/Slow module: the same project with an artificial delay before the review module loads, so the loading message stays visible (see its README).
- Demonstrations/Rejected module: the same project with a review module load that always fails, showing the error fallback (see its README). Both examples use the same port, so run one project at a time.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Click Read workshop reviews: the two local reviews appear below the button while the booking controls stay in place (on a fast local connection the loading message may be too brief to notice). In the Slow module example the loading message shows first; in the Rejected module example the error fallback replaces it.
