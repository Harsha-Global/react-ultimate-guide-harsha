# Admin Workspace

Use the course Node.js 24.21.0 environment and run `npm ci`.

1. In one terminal, run `npm run api`. Open http://127.0.0.1:5191/api/health and confirm `{"status":"ok"}`.
2. In a second terminal, run `npm run dev`. Open http://127.0.0.1:5190.
3. Open a product's Actions menu and choose Edit product. Save a valid name and stock, or cancel.

The local in-memory service resets to the four course products whenever it restarts. PATCH requests have a deliberate 700 ms delay so pending feedback is visible. This is a local teaching service, with no account or production persistence.

Check `npm run build`, `npm run lint`, `npm run test:theme` and `npm run test:api`. The contract checks use an isolated ephemeral server and leave the teaching server untouched.

Try blank/negative/fractional stock, an existing product's name (server rejection), a valid zero-stock save, an API outage and retry, then a browser reload. Values remain in the editor after a failed save. The catalog changes only after the response is accepted.
