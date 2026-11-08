# Solution reasoning

The solution adds one object refinement in `src/registration.ts`. It checks the parsed numeric count against the lead attendee plus the guest array length, then attaches the message to `ticketCount`. It preserves the original city refinement and the exact input/output types. No extra React state or Effect is needed to keep a second total synchronized.

The check runs through the resolver on submission. The supplied UI does not promise that every guest-list change immediately revalidates the ticket-count message; submit again to check the completed combination. Reset uses the same loaded baseline and restores the count/rows/session together. The main project remains unchanged.
