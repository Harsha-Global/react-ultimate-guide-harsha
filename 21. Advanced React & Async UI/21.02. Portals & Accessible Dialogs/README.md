# Portals & Accessible Dialogs

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the Booking component interface).
- Completed/booking-studio: the same project at the end of the lecture, with the session-details dialog (src/Dialog.tsx) rendered through a portal into the #overlays element. Keep it for the next lecture.
- Demonstrations/Portal ancestry: the separate example that shows a portal keeping its React parent (see its README). It uses the same port, so stop the main project's server before running it.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Click View session details: the dialog shows the selected session and its price, and focus moves to Close details. Press Tab and Shift+Tab, then Escape: the dialog closes and focus returns to View session details. In the browser's Elements panel the open dialog is inside #overlays, outside #root.
