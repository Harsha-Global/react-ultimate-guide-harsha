# A06 — Starter

Read `../../Instructions.md` from this project folder. This is a separate starter for independent practice; keep the guided main unchanged.

## Start this checkpoint

Use the supplied Node version and lockfile. Stop the earlier checkpoint's servers. Open a terminal in this `product-explorer` folder:

```sh
npm ci
npm run api
```

Open a second terminal in this same folder:

```sh
npm run dev
```

Visit http://127.0.0.1:5185. The development API health endpoint is http://127.0.0.1:4185/api/health. Use the same hostname throughout a session.

Practice accounts: `jordan@example.com` (member) and `rebecca@example.com` (staff), password `PracticeOnly42!`. Use sample contact details. These are no-payment practice orders. Sessions and orders are held in memory and disappear after a server restart. A pickup window does not reserve a real appointment.

```sh
npm run lint
npm run build
```

## Focused checks

```sh
npm run check:tests
npm run test:run
```

Stop manual development servers before running browser tests. Install the supplied browser once, then run:

```sh
npx playwright install chromium
npm run test:e2e
```

## Built server

```sh
npm run build
npm start
```

Visit http://127.0.0.1:5186. The one production process serves both the browser build and the API. Do not run `vite preview` as the course production service.

Stop the manually started production process before running:

```sh
npm run verify:production
npm run test:production
```

`.env.example` documents the accepted process settings; the Node start command does not automatically load `.env`. Local production uses its default loopback origin. Render must supply the service's exact HTTPS origin as `APP_ORIGIN`; the host supplies `PORT`. Do not put `APP_ORIGIN` in a Vite-prefixed browser variable. Keep Auto-Deploy Off for this teaching demonstration.


An unchanged retry uses the mounted form's existing request ID. Do not reload an uncertain submission to invent a new request ID. Check order history before treating a retry as a new order. The assignment solution is not part of the deployed guided main.
