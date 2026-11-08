# Validate Booking Requests

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the project as completed in the previous lecture (the typed booking reducer).
- Completed/booking-studio-typed: the same project at the end of the lecture: shared/bookingSchema.ts defines the Zod request schema (a discriminated union on kind: a trimmed contact name of 2–80 characters, a trimmed lowercase email, the session and a UUID request id; a group also needs a group name and two to eight attendees with distinct ids), the reference and confirmation schemas and their inferred types; src/typedBookingApi.ts adds submitTypedBooking, which parses the request, posts it to /api/typed-bookings, uses the service's message (or The booking could not be saved.) for a failed status and parses the confirmation. The supplied typed-booking service and its checks are in the project; the page itself is unchanged. Keep it for the next lecture.
- Supplied/Typed booking service: the updated service supplied with this lecture (server/index.mjs, server/typedBookings.mjs, checks/verify-booking.mjs, checks/verify-submission.mjs, Service Contract.md, package.json and package-lock.json with Zod and the verify scripts, and the empty shared/bookingSchema.ts that the lecture fills in), already in the Completed project. When you start from the Starter, stop its API, copy these files over the project, then run `npm ci` and `npm run api`.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

With the API running, run `npm run verify:submission` in a second terminal: a valid morning group booking for Maya and Sam is saved with two places and a reference, a blank attendee name is rejected before a request is sent, and a valid evening request reaches the service but is rejected because that session is full. Read shared/bookingSchema.ts and src/typedBookingApi.ts (the request is checked before it is sent, and the response is parsed before it is returned). Service Contract.md describes the service. The page itself does not submit group bookings yet.
