# Reopen Saved Confirmations

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the project as completed in the previous lecture (individual and group bookings submitted from the form).
- Completed/booking-studio-typed: the same project at the end of the lecture: src/typedBookingApi.ts adds loadBooking (the reference checked before any request, an optional abort signal, Booking not found. for a 404, the confirmation parsed); src/BookingResult.tsx loads it in an effect with cleanup and shows the saved result, the error with Try again, or Loading booking…, with Back to the studio; src/App.tsx shows it when the address has a booking parameter; the confirmation in src/TypedBookingForm.tsx adds Open this confirmation. Keep it for the next lecture.
- Supplied/Saved confirmations/Service Contract.md: the service contract with its saved-confirmation section, already in the Completed project; copy it over Service Contract.md when you start from the Starter.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Book a morning group for Maya and Sam, then choose Open this confirmation: Your booking confirmation shows the reference, 2 places and the morning session. Reload the page: the same saved result appears without another booking. Change the booking value in the address to text that is not a valid reference: This booking link is not valid. (nothing is requested); a correctly formatted reference that does not exist shows Booking not found. A failed load shows Try again. Restarting the API clears its saved bookings, so earlier links then show Booking not found.
