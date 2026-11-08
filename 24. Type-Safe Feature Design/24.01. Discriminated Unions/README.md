# Discriminated Unions

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the supplied starting project: the Willow House booking studio from the advanced React section (session booking, reviews, the studio notice and visit notes), in its own folder so it does not replace that earlier project.
- Completed/booking-studio-typed: the same project at the end of the lecture: src/bookingTypes.ts adds the Attendee, IndividualBooking and GroupBooking types (kind "individual" or "group"; a group has a groupName and an attendees array), the BookingDraft union, placesFor (narrowed by kind: one place, or one per attendee) and newGroup (two attendee rows with distinct ids and blank names); src/TypedBooking.tsx keeps the draft in state, with Just me and A group buttons (aria-pressed), the place count, the existing booking form for an individual draft and a group-name field for a group (not submitted yet); src/App.tsx renders TypedBooking with the selected session in place of the booking form. Keep it for the next lecture.
- Practice: the Narrow the Booking Kind coding exercise (Instructions, Hints, the Starter and Solution and the solution explanation; see its README). In its Starter run `npm ci`, then `npm test`.
- Styles: the prepared stylesheet with the rules for the typed booking (.picker, .attendees, .contract-review, .typed-form), already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter.

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Find Who is coming?: Just me is selected, Places in this booking reads 1 and the familiar booking form is below. Choose A group and type a group name: the count reads 2, two attendee places are ready to edit, and the page says the group draft is not submitted yet. Choose Just me again for the one-person form. Read src/bookingTypes.ts (the two booking shapes joined by their kind property, and placesFor narrowing before it reads attendees) and src/TypedBooking.tsx. Then try the Narrow the Booking Kind exercise in the Practice folder.
