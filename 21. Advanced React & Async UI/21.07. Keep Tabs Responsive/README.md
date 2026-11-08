# Keep Tabs Responsive

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the review list loaded on request).
- Completed/booking-studio: the same project at the end of the lecture, with the Overview and Reviews tabs (src/ReviewsPanel.tsx: the selected view updated inside startTransition, a pending status line and a tab panel; src/ViewTabs.tsx: the prepared tab buttons with keyboard focus movement). Keep it for the next lecture.
- Supplied/ViewTabs.tsx: the prepared tab component, copied into src in the video.
- Demonstrations/Slow transition: the same project with an artificial delay before the review module loads, so the pending message and the retained Overview stay visible (see its README). It uses the same port, so stop the main project's server before running it.
- Styles: the updated prepared stylesheet with the tab styles (already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Click the Reviews tab: the two reviews appear (on a fast local connection the pending message may be too brief to notice). Move between the tabs with the arrow keys and activate one with Enter. In the Slow transition example, click Reviews: the Overview stays visible beside "Opening the selected view…" until the reviews arrive; reload, click Reviews and then Overview before loading finishes: the final view follows the newer choice.
