# Plan the Full-Stack Release

Starter/shopfront-next is the incoming guided application. Completed/shopfront-next is the demonstrated checkpoint. Continue your working copy or use a separate Starter/Completed copy; never combine their build folders.

Also included: Client Designs, Resources.

## Run

Work in C:\react\shopfront-next: continue your own working copy there, or copy this ZIP's Starter (before) or Completed (after) project into that folder; never combine their build folders or `.next` directories. Run `npm ci`. Copy `.env.example` to a private `.env` and fill in your local PostgreSQL login and a random `BETTER_AUTH_SECRET`; keep `BETTER_AUTH_URL` and `SITE_URL` at `http://localhost:3000` and open the app at that exact origin. With PostgreSQL running: `npm run db:generate`, `npm run db:deploy`, then for disposable local course data only `npm run db:seed` and `npm run db:fixtures`. In separate terminals run `npm run api` (127.0.0.1:5211) and `npm run dev` (http://localhost:3000). Stop anything else using ports 3000 or 5211 first.

## Plan the full-stack release

Resources contains the client brief, the local service matrix, the release runbook and the browser and database verification references used throughout this project. Client Designs/v1 is the first design revision: import `ShopFront Full-Stack - v1.fig` into your Figma drafts (the PDF, PNG and SVG files show the same frames). At this checkpoint the public collection still reads from the sample API; the next lecture prepares the database catalog. Local checks prove local behaviour only; hosted database, storage, job, mail and payment-provider checks are separate.
