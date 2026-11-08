# Refs & Imperative Handles

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the review error boundary).
- Completed/booking-studio: the same project at the end of the lecture, with the guest name field (src/NameField.tsx, a narrow focus handle through its ref prop) and the guest details panel that calls it (src/GuestDetails.tsx). Keep it for the next lecture.
- Demonstrations/Callback cleanup: the separate example of a callback ref with cleanup (see its README). It uses the same port, so stop the main project's server before running it.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Click Edit guest name: the Guest name field receives focus and you can type straight away. In the Callback cleanup example, focus the Tracked name input (the count increases once), remove and restore the input, then focus it again (one more event); the console shows the listener being attached and removed.
