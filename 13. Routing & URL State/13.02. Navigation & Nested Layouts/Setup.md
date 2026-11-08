# Navigation & Nested Layouts — setup

Node.js >=22.22.0; React and React DOM 19.3.0; React Router 8.4.0; Vite 8.3.0. Stable versions verified on 27 September 2026. The initial starter omits Router until the setup lecture installs it.

Continue the incoming app in `../13.01. React Router Setup/routed-directory`, or inspect this lecture's completed `routed-directory` copy. Work on one copy at a time. On Windows, keep the working folder at `C:\react\routed-directory`.

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
