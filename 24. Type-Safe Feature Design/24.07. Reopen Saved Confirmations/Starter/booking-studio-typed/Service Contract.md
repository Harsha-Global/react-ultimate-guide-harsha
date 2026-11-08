# Supplied typed-booking service

Use Node.js24. Run `npm ci`, then `npm run api` or `npm run api:slow` in this app. Run `npm run dev` in another terminal. The app at http://127.0.0.1:5210 proxies `/api` to the local service at port4318. Keep one service copy running. Use sample data only; this service does not take payment.

## Submit a booking

`POST /api/typed-bookings` accepts JSON. Both kinds require `name` (trimmed,2–80 characters), `email` (trimmed/lowercased and valid), `slot` (`morning` or `evening`), and `requestId` (UUID). Individual requests use `kind: "individual"`. Group requests use `kind: "group"`, `groupName` (trimmed,2–80 characters), and2–8 attendees. Each attendee has a distinct UUID `id` and a trimmed2–80-character `name`.

The shared Zod schema checks the input. The service separately checks capacity: its fresh fixture has12 morning places and no evening places. A newly accepted request returns201 with `reference`, `kind`, `name`, `slot` and positive integer `places`; it reduces that session's remaining capacity. The same accepted request ID and same normalized details return200 with the original result. Different details using that accepted ID return409. Failed attempts before acceptance do not reserve the key. Preserve an uncertain attempt's key and details when retrying.

Invalid schema values return422; a full session returns409; malformed JSON returns400. The browser helper parses the successful response and throws a useful error for a failed status. Types alone do not validate received JSON.

`npm run verify:submission` exercises the real helper against this local service. The supplied check resets the synthetic fixture first. `npm run verify:booking` runs the pure schema/reducer checks. These are author-supplied checks, separate from the course's later React testing section. Restarting the service also clears its in-memory confirmations, accepted request keys and capacity changes.
