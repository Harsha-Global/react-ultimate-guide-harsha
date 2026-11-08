# ShopFront release and observation runbook

## Rehearsed local release

The source continues the "Production Verification" lecture and adds two migrations: catalog fields and merchant scope/fulfillment. The guided main excludes the optional merchant-note migration. Keep the lockfile; install with npm ci. Stop the known development server and standalone sample API before using the release launcher.

With the established PostgreSQL server running and the private local environment configured:

```powershell
npm run release:check
npm run db:generate
npm run db:deploy
npm run check
npm run lint
npm run release:build
npm run release:start
```

After release:start is ready, use the the "Deploy & Observe ShopFront" lecture supplied scripts/check-local-release.mjs with node scripts/check-local-release.mjs for recovery against that same running build; add --headed for Inspector capture. Keep the release running and let the helper finish its bounded fixture cleanup. Do not start the separate test:browser launcher alongside it. The database health target is /api/workshop/health; /api/health remains the earlier teaching-APIprobe.

release:build and release:start include their own configuration guards. The build/start launcher starts the teaching API for earlier routes and closes its owned process when done. Keep the separate storage/job services only for the workflows being demonstrated. Open the exact configured origin and run Browser Verification.md. Do not seed a persistent release database as a deployment step.

## Database review and rollback

Use Pre-release Inventory Query.sql read-only. Existing products need reviewed mappings to real workspaces before they are offered for purchase. Do not guess IDs or run the local fixture seed on hosted data. Review the migration diff and backup/restore result using the established Section42 process. A code rollback must still be compatible with the applied schema; reverting files does not undo migrations. Merchant ownership is fixed for ordered products in this project; a future transfer workflow needs historical ownership snapshots.

## Actual target-environment checklist — not executed in this authoring run

Record the target release identity, origin and observed result for each item before marking it passed:

1. Configure the hosted database/connection limits, migration role, runtime role and reviewed merchant assignments. Apply reviewed migrations after backup/restore readiness.
2. Match SITE_URL, authentication origin, allowed callbacks and cookie/HTTPS behavior to the real host. Verify password/email flows and any enabled OAuth callback there.
3. Use sandbox-only Stripe credentials. Verify a real hosted test Checkout, signed incoming event, server reconciliation, replay and the resulting order/fulfillment/outbox state. A return URL or controlled session fixture is insufficient evidence.
4. Verify real object storage permissions, CORS, presigned browser upload, server file verification and private owner-only image reads at the target origin.
5. Register the real job endpoint with local-dev mode disabled. Verify outbox acknowledgement, receipt retry and the customer page's saved result. Check mail transport separately.
6. Send the explicitly gated sanitized monitoring test event to the intended environment and confirm receipt there. Keep cookies, secrets, private URLs and customer content out of telemetry. A DSN file alone is not delivery proof.
7. Check private-page denial, fresh public inventory, retries, direct links and mobile behavior against the actual deployed build. Record rollback/recovery actions for any failure.

The course does not run the full hosted rehearsal or account setup. This package does not create accounts or claim that those hosted checks passed.

## Observation and recovery

Observation Queries.sql reads aggregate state without customer content. Investigate undelivered outbox events and received payment events. npm run outbox:dispatch requires the configured job service; npm run payments:recover requires the configured Stripe sandbox. Recover the original durable order/event instead of creating a replacement order to hide uncertainty. Recheck saved state after recovery. Keep failed results and corrective actions in the release record.
