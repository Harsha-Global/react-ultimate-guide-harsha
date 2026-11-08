# Local service matrix

Use the established configuration from Sections 40–42. Work with disposable local data. Keep one consistent browser origin; the student recording convention is http://localhost:3000. Author browser checks use http://localhost:3000; each dated evidence record identifies its isolated database instance and port. Author-only verification ports are not required student configuration.

| Service | Start / endpoint | Needed for |
| --- | --- | --- |
| PostgreSQL | Start the existing local server; .env DATABASE_URL/DIRECT_URL | Catalog, sessions, orders, merchants and every server workflow |
| Teaching API | npm run api; 127.0.0.1:5211 | Incoming the "Plan the Full-Stack Release" lecture–the "Prepare the Database Catalog" lecture catalog and earlier demonstration routes; host launchers own it during build/start |
| Next development | npm run dev; localhost:3000 | The application; keep BETTER_AUTH_URL and SITE_URL consistent |
| Next production | npm run release:build, then npm run release:start | Local production verification; stop standalone API/dev first |
| Object storage | npm run storage; 127.0.0.1:8333 | Private ticket/PUT/verification/image flow; official SeaweedFS executable configured by WEED_BINARY |
| Jobs | npm run jobs; 127.0.0.1:8288 | Local Inngest runner; registers the configured origin's /api/inngest endpoint |
| Local mail | npm run mail; SMTP2525 | Existing email verification/reset examples; fixture sign-in does not require this service |
| Stripe sandbox | Existing private sandbox keys and a real signed webhook setup | Actual hosted test Checkout and provider reconciliation; no live-mode payments |
| Monitoring | Existing separate monitoring destination and explicit demonstration gate | Actual environment event delivery, when separately configured |

The S3 variables must agree with the local storage command. Use the supplied disposable values only for loopback practice. The runner allows the exact BETTER_AUTH_URL origin for browser uploads. Do not switch between localhost and 127.0.0.1 mid-demo.

Jobs use INNGEST_DEV=1 locally. Hosting needs the real service keys, registered app endpoint and local-dev mode disabled. Never put a server secret in a NEXT_PUBLIC variable.

The source keeps the lockfile's package versions. npm ci runs the pinned Inngest CLI installation step. If an author-only install used --ignore-scripts, prepare the official pinned binary with npm rebuild --ignore-scripts=false inngest-cli before the job demonstration. SeaweedFS's Windows executable comes from its official release; it is not included in the course source ZIP. See the earlier storage setup and https://github.com/seaweedfs/seaweedfs/releases/tag/4.48.

Stop only services that you started for this rehearsal. No new practice account, signup, CAPTCHA, Keychain or hosted rehearsal is required for authoring this section.
