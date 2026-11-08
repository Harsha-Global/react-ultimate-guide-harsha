# Workflow Integration Tests — ShopFront source

Package role: A27 - Retry-Safe Reorder / Solution; follow the practice README.md brief and its commands. This checkpoint continues the guided ShopFront project. The separate practice solutions are not an incoming source checkpoint for the following lecture.

Use Node24.21.0 for recording and the supplied package-lock.json. Run commands from this project folder. Install with `npm ci`. Keep each project copy's dependencies and generated files local; do not move node_modules between computers. Stop other Next processes that use this folder's .next output before building, generating a client or running a test launcher.

Create a private .env from .env.example only if it does not already exist. Otherwise merge the newly introduced keys. DATABASE_URL and DIRECT_URL point to your local shopfront_dev database; TEST_DATABASE_URL points to the separate shopfront_test database. Use the shopfront role as owner, enter its password privately, and URL-encode special password characters. Use your PostgreSQL service port consistently (recording default5432). Private credentials are required; the REPLACE_ME examples are not working credentials. Never copy an authoring machine's private environment file.

For this independent assignment, read ../../README.md and ../../Assignment.json relative to this project folder. For the outage/retry browser check, follow the practice brief’s production launcher sequence: npm run host:build, then npm run host:start. Stop/restart that same host:start launcher while retaining the open form; do not use a development-server restart, rebuild or browser reload for this check. Work in the Starter, attempt its stated acceptance checks, then compare the separate Solution. Run npm run test:assignment as the practice brief directs. Its incomplete starter is expected to fail until the requested work is implemented. The guided lecture main is preserved separately.

For a completed checkpoint on a fresh local course database, run `npm run db:deploy`, `npm run db:generate` and `npm run db:seed` before opening the database pages. The seed restores known product fixtures; do not rerun it during a stock-change demonstration. No migration reset is needed. Stop/restart Next after changing the generated client.

After the initial seed, run `npm run db:fixtures` to link the synthetic Alex and Bob accounts to their customer records. Initial local credentials are alex@example.test / bob@example.test with Course-only-passphrase-40!; existing account passwords are preserved. Use the local mailbox recovery flow if you deliberately changed one. A separately registered account is not silently connected to Alex's order. O-1001 belongs to Alex; O-2001 belongs to Bob. These disposable credentials must never be used for a real account or hosted production database.

Use one browser origin: http://localhost:3000. Set BETTER_AUTH_URL to that exact origin. Keep the private random authentication secret stable across normal restarts. localhost and127.0.0.1 are different origins; switching between them can break cookies, callbacks and storage CORS. Restart Next after private environment changes. GitHub sign-in is optional and appears only when its private client ID and secret are configured; the recording callback is http://localhost:3000/api/auth/callback/github.

For normal development, run `npm run dev`, then open http://localhost:3000. For public-catalog pages, run exactly one `npm run api` process in a second terminal from this same project; its endpoint is http://127.0.0.1:5211. The database workshop pages do not use that public catalog service. Keep COURSE_ALLOW_WRITES=disabled unless an earlier, specifically selected local catalog-edit demonstration requires otherwise. The host launcher explicitly disables that older teaching endpoint; authenticated workshop routes use their own session/ownership checks.

Account verification/recovery: run `npm run mail` separately. SMTP is127.0.0.1:2525 and the local mailbox is http://127.0.0.1:3041. Use only example.test recipients. Keep the mailbox running while sending and opening links. Do not change BETTER_AUTH_URL to the mailbox origin. Password/link entry is a manual recording interval; conceal those values while keeping the narration.

Private upload storage: use the pinned SeaweedFS4.48 Windows executable from the recording guide; set WEED_BINARY to its local path. Run `npm run storage` separately with the disposable local S3 credentials from .env.example. S3_ENDPOINT is http://127.0.0.1:8333. The launcher derives CORS from BETTER_AUTH_URL; restart storage when that application origin changes. Upload public/assets/lamp.jpg, not a personal file. The private store keeps data under .local-storage; keep it outside Git and source archives. An upload-success message alone is not proof of verification in the ticket-only checkpoint.

Background work: use INNGEST_DEV=1 only locally. Start Next, then run `npm run jobs` separately. The local dashboard is http://127.0.0.1:8288 and registration uses BETTER_AUTH_URL plus /api/inngest. Stop/restart the runner after registration changes. The demo:receipt and demo:outbox helpers, when available, create clearly labelled synthetic fixtures without contacting Stripe; their `-- clean` argument removes only their own fixture.

Stripe: configure your own sandbox/test secret. No live charges are part of this package. Where the webhook route exists, run `stripe listen --all-snapshot --forward-to http://localhost:3000/api/stripe/webhook`, save that listener's private signing secret and restart Next. A hosted endpoint has its own distinct signing secret. A return URL or controlled local paid fixture does not prove provider delivery. Do not create another order to recover an uncertain checkout response.

Run integration commands one at a time. Stop ordinary Next before any launcher that starts or builds Next, and stop the ordinary sample API before the browser launcher uses5211. Test databases and synthetic accounts are isolated from development; owned launchers stop their own server. Do not disable authentication rate limiting: wait for Retry-After when repeated sign-ins are limited.

Available focused commands:

- `npm run check` — check TypeScript after generating the stage-correct Prisma client.
- `npm run test:recovery` — mailbox2525/3041 must already be running; isolated account reset/expiry/reuse checks.
- `npm run test:auth` — isolated local auth, ownership and workspace HTTP checks; owns port3140.
- `npm run test:input` — stage-correct request/schema checks; owns port3140.
- `npm run test:database` — real constraints and transaction rollback in shopfront_test.
- `npm run test:stock` — two requests compete for stock in the isolated test database.
- `npm run test:orders` — duplicate-key, changed-input and stock-race HTTP checks.
- `npm run test:signatures` — exact-byte signature boundary; no provider account needed.
- `npm run test:inbox` — deduplicated local verified-event objects; no provider delivery claim.
- `npm run test:payments` — controlled current-session objects and payment-state invariants.
- `npm run test:tickets` — storage must be running; waits65seconds for a real ticket expiry.
- `npm run test:uploads` — storage must be running; byte/type/size/race/private-image checks, plus SSE when introduced.
- `npm run test:receipts` — paid-only, concurrent and repeated receipt creation.
- `npm run test:workflows` — controlled payment/outbox failures; refuses unrelated pending outbox work.

For ordinary production-mode behavior, keep the sample API available, stop Next development, run `npm run build`, then `npm start`. The inherited host:build/host:start launchers can own the sample API automatically; never run them beside another API on5211.

Stop only the processes started for this rehearsal with Ctrl+C. Keep source, private local data and any deliberate backup. Do not publish credentials, dumps, generated builds, browser traces or private provider screenshots. The lecture's Author Checks records the actual performed checks and handoff state; the source package does not imply recorded audio, user approval or publication.

Based on the guided Workflow Integration Tests project. Optional A27 changes stay independent; the completed assignment is not the starting project of the next section.
