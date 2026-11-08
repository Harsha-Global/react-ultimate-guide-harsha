# Submit Booking with an Action

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the booking details form).
- Completed/booking-studio: the same project at the end of the lecture, with the booking request sent through the form Action (src/BookingForm.tsx: the asynchronous submitBooking returns a confirmed booking with its reference or a request error as ordinary state; the controls follow the pending and completed states) and the form wrapped in an error boundary with a reload fallback (src/App.tsx). The supplied local booking service (server/index.mjs), package files, proxy configuration (vite.config.ts) and request helper (src/bookingApi.ts) are included. Keep it for the next lecture.
- Supplied/Booking service: the service folder (server), package.json, package-lock.json and vite.config.ts, copied into the project in the video.
- Supplied/bookingApi.ts: the prepared request helper, copied into src in the video.
- Practice/C28 - Preserve a Failed Draft: the coding exercise for this lecture (Starter, Solution and its notes; see its README).
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Choose the Evening session, enter a name and an email address, and click Book this session: "That session is full. Choose the Morning session and try again." appears and both fields keep their text. Choose Morning and book again: the confirmed reference appears and the form is disabled. Stop the service and run `npm run api:slow`, reload and book: "Saving your place…" and the waiting message show until the result arrives. With the service stopped, a booking reports an error that asks you to keep the same details; restart the service and retry them. To reset the practice data, run `Invoke-RestMethod -Method Post -Uri http://127.0.0.1:4318/api/reset` in PowerShell and reload the page.
