# Component Contracts

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the project as completed in the previous lecture (individual and group booking drafts).
- Completed/booking-studio-typed: the same project at the end of the lecture: src/GroupDetails.tsx adds GroupDetails with a props union: mode "edit" requires booking and an onChange callback that receives the updated group booking; mode "review" takes booking with onChange?: never. The review shows the group name and the attendee list (Your group and Name not entered for empty values); the edit view binds the group name and one Attendee name field per attendee (keyed by its id, labels connected with useId). src/TypedBooking.tsx renders an edit instance with onChange={setDraft} and a review instance of the same draft. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Choose A group, enter Saturday Friends as the group name, and type Maya and Sam in the two Attendee name fields: the review below updates as you type, from the same draft. Change Sam's name: Maya's row stays unchanged. Read src/GroupDetails.tsx: remove the onChange prop from the edit instance in src/TypedBooking.tsx and the type checker (`npm run build`) reports the missing callback; restore it afterwards.
