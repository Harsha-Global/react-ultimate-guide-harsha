# Server Data Access

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files/shopfront-next/app/fullstack.css: the workshop page styles, copied into the project in the video and imported in app/layout.tsx.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for Better Auth Setup (Authentication Foundations, in between, changes no code).
- Not included: the private .env and Prisma's generated client folder (generated/), which you create as Run describes.

Saved products read on the server: lib/db.ts (server-only) creates one Prisma client with the PostgreSQL adapter (a pool of at most five connections, a 5-second connection timeout and a 30-second idle timeout) and reuses it across development reloads; lib/productData.ts exports listDatabaseProducts, which selects only id, name, priceMinor and stock, ordered by id and limited to 20 rows; the request-time page app/(store)/workshop/database/page.tsx awaits connection() and shows the products inside a Suspense boundary with a loading status.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (to follow the video) or Completed shopfront-next folder there. No folder anywhere in the path may contain the & character, so never run npm inside the extracted section folder. Open the folder in VS Code. The ZIP leaves out the private .env file and Prisma's generated client (generated/): you create both below.

PostgreSQL must be running with the course role shopfront and its two databases, shopfront_dev (development) and shopfront_test (automated tests only), as set up in Setting the Environment: in SQL Shell, as the postgres administrator, `CREATE ROLE shopfront LOGIN;`, `\password shopfront` (a private password), `CREATE DATABASE shopfront_dev OWNER shopfront;` and `CREATE DATABASE shopfront_test OWNER shopfront;`. Reuse existing course databases; never drop or reset one.

Copy .env.example to .env (Git ignores it) and enter your own private values: in DATABASE_URL and DIRECT_URL (both shopfront_dev) and TEST_DATABASE_URL (shopfront_test) replace REPLACE_ME with the shopfront role's password, and 5432 with your PostgreSQL port if you chose another one. URL-encode special characters in that password (for example @ as %40, : as %3A, / as %2F, # as %23, % as %25), or they are read as parts of the connection string. Keep COURSE_ALLOW_WRITES=disabled in .env, in an .env.local left from the previous section, and in the terminal before you start Next (PowerShell: `$env:COURSE_ALLOW_WRITES="disabled"`; macOS/Linux: `export COURSE_ALLOW_WRITES=disabled`): a terminal value or .env.local takes priority over .env.

Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run db:check`: it prints the connected database (shopfront_dev) and user (shopfront), never the password. Then run `npm run db:deploy` (applies the saved migrations to shopfront_dev; a repeated run reports none pending), `npm run db:generate` (writes Prisma's typed client into generated/; rerun it, and restart Next, after every schema change) and `npm run db:seed` (the sample customers, products and order; safe to repeat, and it restores the sample stock). The seed script refuses any database other than the local shopfront_dev or shopfront_test. To open the app, run `npm run api` in a second terminal (the public catalog still reads its sample catalog API on http://127.0.0.1:5211), then, in another terminal, `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost). `npm run check` checks the TypeScript code; restart Next after `npm run db:generate` or a change to .env. Stop each process with Ctrl+C when you finish.

## Try it

Run `npm run check`, start the app and open http://localhost:3000/workshop/database: Studio Desk Lamp at $89 with 12 available and Terracotta Travel Mug at $28 with 3 available, read from shopfront_dev. The ShopFront catalog link opens the public collection, which still needs `npm run api`. If the page cannot connect, check the PostgreSQL service and .env, then reload. Do not run the seed in the middle of a stock demonstration: it restores the sample stock.
