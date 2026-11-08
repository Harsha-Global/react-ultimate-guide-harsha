# Cedar Club

A separate member-portal teaching project with its own local membership service. Read Service Contract.md before starting.

Run `npm ci` with the supplied lock file; in separate terminals run `npm run api` and `npm run dev`. Open http://localhost:5200; the API uses port 4200, and both ports must be free. Use localhost consistently. This is a separate teaching app, not the ShopFront continuation.

Use sample credentials only. In-memory practice users and sessions reset when the API restarts. Validate with `npm run lint` and `npm run build`.
