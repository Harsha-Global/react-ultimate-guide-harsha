# SQL & Relations

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files/shopfront-next/scripts/sql-lesson.mjs: the SQL lesson runner (it runs sql/relations.sql against your development database and prints the rows it returns), copied into the project in the video.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.
- Not included: the private .env, which you create as Run describes.

How related tables describe one order: sql/relations.sql runs inside a transaction (BEGIN ... ROLLBACK) on temporary tables: customers and products with primary keys and a non-negative integer price in minor units; orders referencing customers; and order_items referencing the order and the product, with a composite primary key, a positive quantity and the saved unit price. It inserts Alex Carter's order O-1001 (one Studio Desk Lamp at 8900, two Terracotta Travel Mugs at 2800) and joins the four tables to calculate each line from the saved price. package.json gains the sql:lesson command.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (to follow the video) or Completed shopfront-next folder there. No folder anywhere in the path may contain the & character, so never run npm inside the extracted section folder. Open the folder in VS Code. The ZIP leaves out the private .env file: you create it below.

PostgreSQL must be running with the course role shopfront and its two databases, shopfront_dev (development) and shopfront_test (automated tests only), as set up in Setting the Environment: in SQL Shell, as the postgres administrator, `CREATE ROLE shopfront LOGIN;`, `\password shopfront` (a private password), `CREATE DATABASE shopfront_dev OWNER shopfront;` and `CREATE DATABASE shopfront_test OWNER shopfront;`. Reuse existing course databases; never drop or reset one.

Copy .env.example to .env (Git ignores it) and enter your own private values: in DATABASE_URL and DIRECT_URL (both shopfront_dev) and TEST_DATABASE_URL (shopfront_test) replace REPLACE_ME with the shopfront role's password, and 5432 with your PostgreSQL port if you chose another one. URL-encode special characters in that password (for example @ as %40, : as %3A, / as %2F, # as %23, % as %25), or they are read as parts of the connection string. Keep COURSE_ALLOW_WRITES=disabled in .env, in an .env.local left from the previous section, and in the terminal before you start Next (PowerShell: `$env:COURSE_ALLOW_WRITES="disabled"`; macOS/Linux: `export COURSE_ALLOW_WRITES=disabled`): a terminal value or .env.local takes priority over .env.

Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run db:check`: it prints the connected database (shopfront_dev) and user (shopfront), never the password. To open the app, run `npm run api` in a second terminal (the public catalog still reads its sample catalog API on http://127.0.0.1:5211), then, in another terminal, `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost). `npm run typecheck` checks the TypeScript code; restart Next after a change to .env. Stop each process with Ctrl+C when you finish.

## Try it

Run `npm run sql:lesson`: two rows appear, Alex Carter / Studio Desk Lamp / 1 / 8900 and Alex Carter / Terracotta Travel Mug / 2 / 5600 (together $145). The script ends with ROLLBACK, so the temporary tables are gone afterwards and no permanent table is created; run it again for the same result.
