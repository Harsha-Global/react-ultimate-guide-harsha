# React Router Setup — setup

Node.js >=22.22.0; React and React DOM 19.3.0; React Router 8.4.0; Vite 8.3.0. Stable versions verified on 27 September 2026. The initial starter omits Router until the setup lecture installs it.

Continue the incoming app in `Starter/routed-directory`, or inspect this lecture's completed `routed-directory` copy. Work on one copy at a time. On Windows, keep the working folder at `C:\react\routed-directory`.

```bat
cd /d C:\react\routed-directory
npm ci
npm run api
```

Leave the API terminal running. In a second terminal:

```bat
cd /d C:\react\routed-directory
npm run dev
```

Open http://127.0.0.1:5183. API health check: http://127.0.0.1:4183/api/health. Vite forwards `/api` to port 4183. Stop any previous copy on these ports before starting a different lecture copy; do not kill unrelated processes. A clean API start restores Avery Stone (e1), Morgan Reed (e2), Jordan Lee (e3). Data is in memory. A 350 ms teaching delay makes pending states observable. No Node implementation walkthrough is required.

The complete prepared styles are in `Styles/index.css` and `Styles/fonts.css`; destinations are `routed-directory/src/index.css` and `routed-directory/src/fonts.css`. The supplied runnable app includes its local font assets in `public/fonts` and licenses. The main entry already imports `./index.css`. Check both desktop and narrow layouts.

```bat
npm run check
npm run lint
npm run build
```

Author-side validation used macOS. Windows installation/recording and browser-owned beforeunload prompts must be checked on the actual recording machine. These commands are recording instructions, not a claim that a recording exists.

In the incoming starter, add Router at the narrated installation step:

```bat
npm install --save-exact react-router@8.4.0
```

The completed app already contains this pinned dependency; use `npm ci` for that copy.

## Request-client continuity

This starter is a separate routing project built with the familiar native Fetch request helpers. It has no Axios dependency and continues through Section 14. Use it directly; keep Section 12’s completed Axios app as a reference. Do not copy Axios configuration into this starter or undo the Section 12 migration. Native Fetch remains the default for later direct API requests.
