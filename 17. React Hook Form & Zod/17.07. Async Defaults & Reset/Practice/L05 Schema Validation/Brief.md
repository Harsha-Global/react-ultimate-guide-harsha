# L05 — Schema Validation

The editor can currently accept a ticket count that does not match the named attendees. Extend its schema so the total is exactly one lead attendee plus the number of additional guests. Keep the current required fields, attendance/city rule and reset behavior working.

## Start

Use this activity’s `Starter/event-registration`, copied beneath `C:\react\L05-schema-validation`. Stop the main project’s servers before using the same ports. Run `npm ci`, `npm run api`, and in another terminal `npm run dev`. The API supplies the two existing practice records. No save request is added by this activity.

## Acceptance checks

1. Alex’s loaded two-ticket record with Jordan as a guest passes.
2. Remove Jordan without changing the count. Submit: a clear message appears beside Tickets, and no preview is produced.
3. Set the count to one. Submit: it passes and the preview contains no guests.
4. Add a valid guest name and set the count to two. Submit: it passes.
5. Change the guest list, ticket count and session, then use Reset to loaded details. The loaded defaults and field-array rows return together.
6. Switch to Casey. One ticket and no additional guests passes; the in-person city rule still works if attendance changes.

Related lectures: Cross-Field Validation & Coercion, Nested Fields & Field Arrays, and Async Defaults & Reset. Try independently, then open Hints.md if needed. Compare `Solution/event-registration` only after attempting the change. Continue the course from the main lecture project, not this optional solution.
