# Navigation Guards & Code Splitting — setup

Node.js >=22.22.0; React and React DOM 19.3.0; React Router 8.4.0; Vite 8.3.0. The initial starter omits Router until the setup lecture installs it.

Continue your existing `routed-directory` app, or inspect this lecture's completed `routed-directory` copy. Work on one copy at a time. On Windows, keep the working folder at `C:\react\routed-directory`.

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

## Inspect the lazy editor in the built app

Keep the API running on 4183. Stop only the Vite development terminal, then run `npm run build` and `npm run preview`. Open the printed preview URL; Vite preview inherits the configured server proxy for /api. In Network, reload /employees and then open /employees/e1/edit to inspect the separate editor chunk. Use the default preview port unless occupied; always follow the printed URL. After this comparison, stop the preview and restore `npm run dev`. Use a short browser window so the list actually scrolls before testing history restoration; do not claim a scroll result on a page that fits entirely in the viewport.
