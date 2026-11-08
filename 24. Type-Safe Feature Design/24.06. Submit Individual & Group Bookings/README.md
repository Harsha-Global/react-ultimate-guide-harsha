# Submit Individual & Group Bookings

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the project as completed in the previous lecture (the validated request helper and the typed-booking service).
- Completed/booking-studio-typed: the same project at the end of the lecture: src/TypedBookingForm.tsx submits either booking kind with useActionState: controlled Contact name and Email address fields, a request id kept for retries, safeParse before submitTypedBooking, the error in an alert, Saving booking… while pending, and the confirmation (places, session and reference, with Start another booking); an effect reports the lock to the parent. src/App.tsx keeps a bookingLocked state; src/TypedBooking.tsx renders the form for both kinds and disables its booking choices while locked; src/OptionPicker.tsx gains an optional disabled prop, used by the session picker. Keep it for the next lecture.
- Styles: the updated prepared stylesheet with the locked booking-choices rule (.booking-choices), already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter.

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Choose A group, enter a group name, Maya and Sam, and a contact name and email; select Evening and choose Book this visit: the service rejects it (There are not enough places in that session. Choose another session.), and the group name, attendee names and contact details stay. Select Morning and book again: with `npm run api:slow` the button reads Saving booking… and the booking choices and session buttons are disabled; then the confirmation shows 2 places in the morning session with its reference, and the choices stay locked. Choose Start another booking, then Just me, and book again: the confirmation shows 1 place.
