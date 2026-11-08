# Setting the Environment

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed at the end of the previous section (Deploy the Public Storefront); Database Foundations, the lecture before this one, changes no code.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.
- Not included: the private .env, which you create as Run describes.

The ShopFront project gets its own local PostgreSQL database: PostgreSQL installed with the Windows installer; a login role shopfront that owns two databases, shopfront_dev for development and shopfront_test for the later automated tests; the pinned database tools installed with `npm install ... --save-exact` (the pg driver, dotenv, the Prisma client and its PostgreSQL adapter; Prisma, tsx and the pg types as development tools) with two dependency overrides; the hosting launcher (scripts/host.mjs) reading .env through dotenv and choosing its local or hosted hostname and port; .env ignored by Git before it exists; .env.example with the three connection URLs and COURSE_ALLOW_WRITES=disabled; and a connection check (scripts/db-check.mjs, `npm run db:check`) that prints the connected database and role.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (to follow the video) or Completed shopfront-next folder there. No folder anywhere in the path may contain the & character, so never run npm inside the extracted section folder. Open the folder in VS Code. The ZIP leaves out the private .env file: you create it below.

PostgreSQL: install it with the official Windows installer linked from https://www.postgresql.org/download/windows/ (keep the database server, the command line tools and pgAdmin; Stack Builder is optional). Choose a private administrator password and keep it safe; use port 5432 if it is free, otherwise another free port, and use that port everywhere. Open SQL Shell, sign in as the postgres administrator on that port and run `CREATE ROLE shopfront LOGIN;`, then `\password shopfront` (the course role's own private password, never saved in a file), `CREATE DATABASE shopfront_dev OWNER shopfront;` and `CREATE DATABASE shopfront_test OWNER shopfront;`, then `\q`. shopfront_dev holds your normal development data; shopfront_test is only for the automated tests. If these databases already exist from your earlier work, reuse them: never drop or reset a database.

Copy .env.example (in the Completed folder; the video writes it step by step) to .env (Git ignores it) and enter your own private values: in DATABASE_URL and DIRECT_URL (both shopfront_dev) and TEST_DATABASE_URL (shopfront_test) replace REPLACE_ME with the shopfront role's password, and 5432 with your PostgreSQL port if you chose another one. URL-encode special characters in that password (for example @ as %40, : as %3A, / as %2F, # as %23, % as %25), or they are read as parts of the connection string. Keep COURSE_ALLOW_WRITES=disabled in .env, in an .env.local left from the previous section, and in the terminal before you start Next (PowerShell: `$env:COURSE_ALLOW_WRITES="disabled"`; macOS/Linux: `export COURSE_ALLOW_WRITES=disabled`): a terminal value or .env.local takes priority over .env.

Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run db:check`: it prints the connected database (shopfront_dev) and user (shopfront), never the password. To open the app, run `npm run api` in a second terminal (the public catalog still reads its sample catalog API on http://127.0.0.1:5211), then, in another terminal, `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost). `npm run typecheck` checks the TypeScript code; restart Next after a change to .env. Stop each process with Ctrl+C when you finish.

## Try it

Run `npm run db:check`: the table shows the database shopfront_dev and the user shopfront. If the connection fails, check that the PostgreSQL service is running, then the port, then the private values in .env and the URL-encoding of the password. The storefront itself is unchanged: with `npm run api` and `npm run dev -- --port 3000` running, http://localhost:3000/catalog still shows the public collection, without the local inventory editor because COURSE_ALLOW_WRITES is disabled.
