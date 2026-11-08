# Fix Queued State Updates

Repair Add two tickets so one activation from 1 displays 3. Keep functional updates pure and preserve the inclusive 1–6 bounds. Edit the handler in App.tsx; preserve the accessible button labels.

Attempt the Starter before opening Solution. Both are complete TSX projects. From the copied project folder run `npm ci`, then `npm run dev`.

## Check your result

- Starts at 1.
- Add two:1→3.
- Repeated Add two:3→5→6.
- Near upper bound 5→6.
- Remove never goes below 1.
- Disabled boundary buttons match the quantity.

## TypeScript and platform format

The local project uses TSX. The native exercise files contain the same React behavior in JSX, omitting TypeScript-only syntax. No second attempt is required. Native files are an authoring bundle; platform draft creation and actual platform runtime checks are pending. No hosted exercise is claimed.

New syntax comparison: The numerical useState(1) call infers number, so it is identical in TSX and JSX. No type syntax needs to be removed from that Hook call.
