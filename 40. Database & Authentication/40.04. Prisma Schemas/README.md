# Prisma Schemas

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.
- Not included: the private .env and Prisma's generated client folder (generated/), which you create as Run describes.

The application data described in a Prisma schema (prisma/schema.prisma): the client generator (output in generated/prisma) and the PostgreSQL datasource, without a URL; Customer (unique email), Product (unique slug, integer price in minor units and stock), Order (a generated cuid id, Restrict when its customer is deleted, status pending by default, createdAt, an index on customerId and createdAt) and OrderItem (a composite primary key, Cascade from its order, Restrict on its product, an index on productId). prisma.config.ts reads DIRECT_URL through dotenv and names the schema, the migrations folder and the seed command; .gitignore ignores generated/; package.json gains db:generate, db:deploy, db:seed and check.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (to follow the video) or Completed shopfront-next folder there. No folder anywhere in the path may contain the & character, so never run npm inside the extracted section folder. Open the folder in VS Code. The ZIP leaves out the private .env file and Prisma's generated client (generated/): you create both below.

PostgreSQL must be running with the course role shopfront and its two databases, shopfront_dev (development) and shopfront_test (automated tests only), as set up in Setting the Environment: in SQL Shell, as the postgres administrator, `CREATE ROLE shopfront LOGIN;`, `\password shopfront` (a private password), `CREATE DATABASE shopfront_dev OWNER shopfront;` and `CREATE DATABASE shopfront_test OWNER shopfront;`. Reuse existing course databases; never drop or reset one.

Copy .env.example to .env (Git ignores it) and enter your own private values: in DATABASE_URL and DIRECT_URL (both shopfront_dev) and TEST_DATABASE_URL (shopfront_test) replace REPLACE_ME with the shopfront role's password, and 5432 with your PostgreSQL port if you chose another one. URL-encode special characters in that password (for example @ as %40, : as %3A, / as %2F, # as %23, % as %25), or they are read as parts of the connection string. Keep COURSE_ALLOW_WRITES=disabled in .env, in an .env.local left from the previous section, and in the terminal before you start Next (PowerShell: `$env:COURSE_ALLOW_WRITES="disabled"`; macOS/Linux: `export COURSE_ALLOW_WRITES=disabled`): a terminal value or .env.local takes priority over .env.

Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run db:check`: it prints the connected database (shopfront_dev) and user (shopfront), never the password. Then run `npm run db:generate`: Prisma writes its typed client into generated/ (rerun it after every schema change). To open the app, run `npm run api` in a second terminal (the public catalog still reads its sample catalog API on http://127.0.0.1:5211), then, in another terminal, `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost). `npm run check` checks the TypeScript code; restart Next after `npm run db:generate` or a change to .env. Stop each process with Ctrl+C when you finish.

## Try it

Run `npm run db:generate`: Prisma validates the schema and writes the typed client into generated/ (never edit it by hand: the next generation replaces it). `npm run check` passes, and generated/prisma/models/Order.ts shows the generated Order types. Generation creates no tables: shopfront_dev stays empty until the migration in the next lecture.
