# Type Safety & Runtime Validation

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the project as completed in the previous lecture (saved confirmations reopened from their link).
- Completed/booking-studio-typed: the same project at the end of the lecture: unchanged in this lecture: it checks the finished feature (compiler, runtime schema, service rules and both booking journeys) rather than changing it. The next section starts from its own supplied Starter.
- Demonstrations/Missing action: two small TypeScript projects, Faulty (the groupRenamed action without its reducer case) and Fixed (with the case). In each, run `npm ci`, then `npm run check`.
- Practice: the Add a Group Contact Rule assignment (Assignment.md with its checks, Rubric.md, the Starter and Solution projects and the solution explanation; see its README). Each is a complete application on the same ports, so stop the main app and API before running one.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

In Demonstrations/Missing action run `npm ci` and `npm run check` in Faulty: the error at the assertNever call names the groupRenamed action; the same check passes in Fixed. In the Completed project run `npm run verify:booking`: it checks incomplete group details, repeated attendee ids and the group-size limits. With the API running, send a group request with a blank attendee name straight to http://127.0.0.1:4318/api/typed-bookings (for example with PowerShell's Invoke-RestMethod -Method Post -ContentType "application/json"): the service rejects it; a valid group request for the evening session is rejected because that session is full. Then check both journeys in the browser: an individual morning booking (1 place) and its confirmation link, Back to the studio, a group with edited, added and removed attendees, the full evening session (the draft stays) and a morning retry; also the session dialog, reviews and visit notes. For the assignment, read Assignment.md in the Practice folder.
