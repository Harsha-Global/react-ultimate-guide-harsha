# Routed directory

Ready-to-run source for “Route Parameters & Fallbacks”.

Node.js >=22.22.0; React and React DOM 19.3.0; React Router 8.4.0; Vite 8.3.0. Stable versions verified on 27 September 2026. The initial starter omits Router until the setup lecture installs it.

On Windows copy this folder to `C:\react\routed-directory`, run `npm ci`, then `npm run api` in one terminal and `npm run dev` in another. Open http://127.0.0.1:5183. API health: http://127.0.0.1:4183/api/health. Keep both processes running. Restarting the API resets the sample data. Stop only the API for intentional failure demonstrations; keep Vite running.

Checks: `npm run check`, `npm run lint`, `npm run build`. Follow the parent lecture's Code.md for the change sequence. The `src/index.css` import and local fonts are already supplied. The source copy includes the two required font files and licenses so it runs independently after download; authoring diagrams and guides use the shared course library.

Current stable `react-router` package only. No `react-router-dom` dependency, old-version migration material or beta APIs. Data Mode here executes in the browser; the API is separate. This is sample data, not a production permissions system.
