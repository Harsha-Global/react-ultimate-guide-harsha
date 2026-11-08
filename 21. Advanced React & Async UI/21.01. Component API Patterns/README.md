# Component API Patterns

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the supplied Willow House booking studio, the project for this part of the course. Its booking panel is written inline in App.tsx.
- Completed/booking-studio: the same project at the end of the lecture, with the Booking component interface (src/Booking.tsx) used by App.tsx. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Choose the Evening option: the selected button and the summary change to the evening time and £79. Choose Morning again for £64, then use Tab and Enter or Space to reach and activate the other option.
