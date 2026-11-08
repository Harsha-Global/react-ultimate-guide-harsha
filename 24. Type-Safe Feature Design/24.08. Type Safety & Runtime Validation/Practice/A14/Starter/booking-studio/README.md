# Type Safety & Runtime Validation

Verify compile-time contracts, runtime data checks and service rules, then apply a group-only requirement.

It continues the completed Booking Studio project from the guided lectures. Keep `Practice` and `Demonstrations` separate from the guided project.

## Run the app

Use Node.js 24 LTS and the supplied lockfile. In the project terminal:

```sh
npm ci
npm run api
```

In a second terminal in that same project:

```sh
npm run dev
```

Open http://127.0.0.1:5210. The service health check is http://127.0.0.1:4318/api/health. Stop the previous lecture's servers before running this checkpoint. Use the same hostname throughout a session.

```sh
npm run build
npm run lint
```

Prepared presentation files are in `Styles`. Follow `Code.md` for the teaching sequence and exact files. The supplied service is for local practice only; it does not process real payments.

The supplied service has available morning places and a full evening session for the recovery demonstration. Use `npm run api:slow` instead of `npm run api` to observe pending feedback. `POST /api/reset` restores the local practice service; restarting it also resets its in-memory data. Reset between independent test runs, not during a pending request. No payment is collected.
