# Error Boundaries

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the portal dialog).
- Completed/booking-studio: the same project at the end of the lecture, with the error boundary (src/ErrorBoundary.tsx) around the workshop reviews (src/ReviewsPanel.tsx). Keep it for the next lecture.
- Supplied/ReviewList.tsx: the prepared review list, copied into src in the video.
- Demonstrations/Render failure: the separate example that causes a review rendering failure and compares the two retries (see its README). It uses the same port, so stop the main project's server before running it.
- Practice/C27 - Recover One Panel: the coding exercise for this lecture (Starter, Solution and the Native files; see its README).
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Choose the Evening option: the summary changes to £79 and the two reviews stay below the booking panels. In the Render failure example, click Cause a review render failure: the fallback replaces the reviews while the Outside the boundary counter still works. Retry unchanged input fails again; Fix input and retry shows the reviews. The console reports the intentional error.
