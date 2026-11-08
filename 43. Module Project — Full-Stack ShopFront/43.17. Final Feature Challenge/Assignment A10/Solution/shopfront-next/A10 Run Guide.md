# A10 independent setup and checks

Copy the **contents** of the selected `shopfront-next` folder into a safe working folder. For Windows use `C:\react\a10-attempt` for Starter and, only after your attempt, `C:\react\a10-reference` for Solution. Check the entire path: no parent folder may contain `&`. Keep the guided project and your attempted source/database intact.

Use PostgreSQL 18 and the pinned Node/packages from the course. The following PowerShell example creates another local cluster, not another database in the guided cluster. Adjust only the PostgreSQL binary directory if your installation is elsewhere. Use an unused port. Do not run `initdb` over an existing data directory.

For the Starter attempt:

```powershell
$a10PgBin = 'C:\Program Files\PostgreSQL\18\bin'
$a10Data = 'C:\react\data\a10-attempt'
$a10Port = 5433
& "$a10PgBin\initdb.exe" -D $a10Data -U postgres -W -A scram-sha-256
& "$a10PgBin\pg_ctl.exe" -D $a10Data -l "$a10Data\server.log" -o "-h 127.0.0.1 -p $a10Port" -w start
& "$a10PgBin\psql.exe" -h localhost -p $a10Port -U postgres -d postgres
```

Enter the private administrator password when prompted, outside recording capture. In that new cluster's psql session:

```sql
CREATE ROLE shopfront LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE;
\password shopfront
CREATE DATABASE shopfront_dev OWNER shopfront;
CREATE DATABASE shopfront_test OWNER shopfront;
\q
```

The password command prompts privately. Do not put actual passwords in shared files or recordings. Verify that the port identifies this new cluster before creating or migrating anything.

For the reference Solution, repeat the same setup with **a different empty directory and port**, such as `C:\react\data\a10-reference` and `5434`. This preserves any schema/migrations and notes you created during your own attempt; the reference migration may conflict with an independently implemented table. Do not point the reference at the attempted or guided database. Keep `shopfront_dev` and `shopfront_test` as the database names inside each independent cluster, because the course launchers guard those names.

In the chosen working project, run `npm ci`, then copy `.env.example` to a private `.env`. Configure all three connections before any Prisma command. URL-encode password characters as required. For the Starter's example port:

```dotenv
DATABASE_URL="postgresql://shopfront:YOUR_URL_ENCODED_PASSWORD@localhost:5433/shopfront_dev"
DIRECT_URL="postgresql://shopfront:YOUR_URL_ENCODED_PASSWORD@localhost:5433/shopfront_dev"
TEST_DATABASE_URL="postgresql://shopfront:YOUR_URL_ENCODED_PASSWORD@localhost:5433/shopfront_test"
```

Use the reference cluster's port in **all three** Solution values. Generate your own stable `BETTER_AUTH_SECRET`. Keep `SITE_URL` and `BETTER_AUTH_URL` at `http://localhost:3000`, `PORT=3000` and `DEPLOYMENT_KIND=local`. Clear any inherited shell connection variables that would override this file, and do not copy an old `.env.local` from the guided project. Payment/OAuth/monitoring credentials are not needed for this note exercise; leave them blank and monitoring disabled. The synthetic identities do not need a live mail, payment, job or storage service.

From the chosen project directory:

```text
npm run db:generate
npm run db:deploy
npm run db:seed
npm run db:fixtures
npm run check
npm run lint
npm run dev
```

Seed only this newly created disposable assignment database. The normal Next server uses port3000; stop the guided server first. For this database-backed merchant exercise the teaching API is unnecessary. Sign in at `http://localhost:3000/account` as `alex@example.test`, password `Course-only-passphrase-40!`, and open `/merchant/W-1`. The Starter has inventory/orders and no Merchant note field. Keep the Solution closed while implementing the three tasks.

## Reference checks after the attempt

After initializing the separate Solution as above, stop its development server and wait for the terminal prompt. Keep port3140 free and use the Solution directory for these commands:

```text
npm run test:merchant-notes
npx playwright install chromium
node scripts/test-server.mjs tests/merchant-note.browser.mjs
```

Install the pinned browser once if it is not already available. Each command runs by itself. The test launcher initializes only this Solution's isolated `shopfront_test`, starts a temporary **development** server on3140 and stops it when the command exits. It does not use the running development instance on3000 and does not build a production release. Do not run another app/test/build in this working copy simultaneously. The integration check covers server validation, workspace/order scope, concurrent revisions and customer privacy. The browser check additionally covers the form, pending controls, stale409 feedback, actual committed-response loss, recovery refresh, viewer read/direct-write denial and narrow layout. Its temporary order/notes are removed and its changed membership role is restored.

For visible capture in PowerShell:

```powershell
$env:COURSE_A10_HEADED = '1'
try {
  node scripts/test-server.mjs tests/merchant-note.browser.mjs
} finally {
  Remove-Item Env:COURSE_A10_HEADED -ErrorAction SilentlyContinue
}
```

The browser pauses in Playwright Inspector at the stale response, the uncertain saved response, the recovered value and viewer-only view. Choose Resume each time; let the command finish its cleanup. The headless path was executed by the author; the optional Inspector path still needs actual recording capture. The saved screenshot is `test-results/a10-note-mobile.png`. This harness defaults to installed Playwright Chromium; its optional `PLAYWRIGHT_CHANNEL` environment setting is distinct from the guided project's Playwright configuration.

After isolated checks exit, run `npm run dev` for manual review at the normal origin. Its `shopfront_dev` remains separate from test fixtures. To demonstrate overlong input, use a direct request because the text area's `maxLength` prevents ordinary typing beyond240characters. To inspect an uncertain write, copy the retained draft before choosing Refresh saved note; never infer that a failed response means the server did not commit.

If Next repeatedly refreshes after switching from the isolated test server or restarting development, stop the owned Next process and wait for its terminal prompt. Remove only the generated `.next` directory in this working copy, then restart. Source, `.env`, database data and `node_modules` stay intact. In PowerShell from the correct assignment project:

```powershell
if (Test-Path -LiteralPath '.next') { Remove-Item -LiteralPath '.next' -Recurse -Force }
npm run dev
```

The author reproduced this refresh loop on a repeated normal restart and verified recovery with fresh generated output. This is a conditional recovery step, not a source repair or a reason to reset the assignment database.

When finished, stop Next and any owned test process first. Stop only the relevant assignment cluster with `pg_ctl -D <that-assignment-data-directory> -m fast -w stop`; preserve its files for your comparison. Never use the guided data directory in this command.

Author evidence: fresh Starter/Solution installs and actual PostgreSQL/browser checks on macOS with Node24.19.0; Windows command syntax is provided for the course setup but Windows execution is not claimed. No hosted provider, payment or deployment is performed by A10.
