# Migrations & Seed Data

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.
- Not included: the private .env and Prisma's generated client folder (generated/), which you create as Run describes.

The schema applied as a reviewed migration: the initial migration (prisma/migrations/<timestamp>_storefront_base/migration.sql) generated with `npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script --output ...`, inspected, and completed with check constraints (price and stock zero or greater, quantity greater than zero, saved unit price zero or greater); migration_lock.toml names the postgresql provider; `npm run db:deploy` applies it. prisma/seed.ts refuses any database other than the local shopfront_dev or shopfront_test and upserts the sample customers (Alex Carter, Morgan Reed), products (the lamp at 8900 with stock 12, the mug at 2800 with stock 3) and order O-1001 with its two items.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (to follow the video) or Completed shopfront-next folder there. No folder anywhere in the path may contain the & character, so never run npm inside the extracted section folder. Open the folder in VS Code. The ZIP leaves out the private .env file and Prisma's generated client (generated/): you create both below.

PostgreSQL must be running with the course role shopfront and its two databases, shopfront_dev (development) and shopfront_test (automated tests only), as set up in Setting the Environment: in SQL Shell, as the postgres administrator, `CREATE ROLE shopfront LOGIN;`, `\password shopfront` (a private password), `CREATE DATABASE shopfront_dev OWNER shopfront;` and `CREATE DATABASE shopfront_test OWNER shopfront;`. Reuse existing course databases; never drop or reset one.

Copy .env.example to .env (Git ignores it) and enter your own private values: in DATABASE_URL and DIRECT_URL (both shopfront_dev) and TEST_DATABASE_URL (shopfront_test) replace REPLACE_ME with the shopfront role's password, and 5432 with your PostgreSQL port if you chose another one. URL-encode special characters in that password (for example @ as %40, : as %3A, / as %2F, # as %23, % as %25), or they are read as parts of the connection string. Keep COURSE_ALLOW_WRITES=disabled in .env, in an .env.local left from the previous section, and in the terminal before you start Next (PowerShell: `$env:COURSE_ALLOW_WRITES="disabled"`; macOS/Linux: `export COURSE_ALLOW_WRITES=disabled`): a terminal value or .env.local takes priority over .env.

Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run db:check`: it prints the connected database (shopfront_dev) and user (shopfront), never the password. Then run `npm run db:deploy` (applies the saved migrations to shopfront_dev; a repeated run reports none pending), `npm run db:generate` (writes Prisma's typed client into generated/; rerun it, and restart Next, after every schema change) and `npm run db:seed` (the sample customers, products and order; safe to repeat, and it restores the sample stock). The seed script refuses any database other than the local shopfront_dev or shopfront_test. To open the app, run `npm run api` in a second terminal (the public catalog still reads its sample catalog API on http://127.0.0.1:5211), then, in another terminal, `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost). `npm run check` checks the TypeScript code; restart Next after `npm run db:generate` or a change to .env. Stop each process with Ctrl+C when you finish.

## Try it

`npm run db:deploy` applies the migration (run it again: no pending migrations), then `npm run db:generate`. The pinned Prisma CLI may begin a freshly generated initial migration with `CREATE SCHEMA IF NOT EXISTS "public";`: a harmless line to keep. Run `npm run db:seed` twice: the second run creates no duplicates. In SQL Shell or pgAdmin, connected to shopfront_dev, `SELECT COUNT(*) FROM "Customer";` and the same for "Product", "Order" and "OrderItem" give 2, 2, 1 and 2 in a fresh database. Never use a reset command on a shared database, and never edit a migration that has been applied: create a new one for the next change.
