# Read Context with use

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the temporary review shown while it is saved).
- Completed/booking-studio: the same project at the end of the lecture, with an optional session reminder (src/Booking.tsx: the Reminder component returns null when it is hidden and otherwise reads BookingContext with use after that early return, then shows the selected session; src/App.tsx: the showReminder state, the Show session reminder checkbox and Booking.Reminder inside Booking.Root). Keep it for the next lecture.
- Styles: the updated prepared stylesheet with the reminder styles (already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Select Show session reminder: the reminder shows the Morning session and its time. Choose Evening: the reminder and the session summary both change. Clear the checkbox, choose Morning, and select it again: the reminder shows the Morning session.
