# Check Booking with an Action

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the workshop search).
- Completed/booking-studio: the same project at the end of the lecture, with the booking details form (src/BookingForm.tsx: useActionState runs a local check of the submitted session and guest name and returns the message to show; src/NameField.tsx now accepts a value, a change callback, required and disabled) in place of the guest details panel. No booking request is sent yet. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Enter a one-letter guest name and a valid email address, then click Check booking details: "Enter at least two characters for your name." appears and both fields keep their values. Change the name to Avery Stone and check again: the local check is confirmed without claiming a booking. Choose the Evening session and check again: the message names the evening session.
