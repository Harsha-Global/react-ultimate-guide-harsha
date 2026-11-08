# Reducer Contracts & Exhaustive Checks

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the project as completed in the previous lecture (the generic option picker).
- Completed/booking-studio-typed: the same project at the end of the lecture: src/bookingReducer.ts adds the BookingAction union (replaced with a draft, attendeeAdded with an attendee, attendeeRemoved with an id) and bookingReducer, which keeps a group between two and eight attendees with distinct ids, returns new objects, and calls assertNever (a never parameter that throws) in its default branch; src/TypedBooking.tsx uses useReducer with a setDraft helper that dispatches replaced, an Add attendee button (disabled at eight) and a Remove attendee button per row (disabled at two). Keep it for the next lecture.
- Demonstrations/Missing action: two small TypeScript projects, Faulty (the groupRenamed action without its reducer case) and Fixed (with the case). In each, run `npm ci`, then `npm run check`.
- Practice: the Keep Reducer Actions Complete coding exercise (Instructions, Hints, the Starter and Solution and the solution explanation; see its README). In its Starter run `npm ci`, then `npm test`; the incomplete Starter intentionally fails the exhaustive type check until you add the case.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Choose A group and enter Maya and Sam. Choose Add attendee and enter Nora in the new row, then choose Remove attendee 2: Maya and Nora remain, in the fields and in the review. Add people until the group has eight: Add attendee is disabled; with two people the Remove attendee buttons are disabled. In Demonstrations/Missing action run `npm ci` and `npm run check` in Faulty: the compiler reports the groupRenamed action at the assertNever call; the same check passes in Fixed. Then try the Keep Reducer Actions Complete exercise in the Practice folder.
