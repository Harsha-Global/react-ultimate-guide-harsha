# Direct links and router choices

Use the completed main app for this lecture. Keep its API on port4183. These local tools demonstrate hosting behavior; they are not production servers and no deployment is performed.

Copy `Demonstrations/hosting` to `C:\react\routing-hosts`. Build the main app:

```bat
cd /d C:\react\routed-directory
npm run build
```

In two separate Command Prompt terminals:

```bat
node C:\react\routing-hosts\server.mjs --plain --root C:\react\routed-directory\dist
```

```bat
node C:\react\routing-hosts\server.mjs --fallback --root C:\react\routed-directory\dist
```

1. Open http://127.0.0.1:5186/. Follow an internal link to employee e1; then reload. Internal navigation works, but the plain host returns404 for the direct detail path.
2. Open http://127.0.0.1:5187/employees/e1. The fallback host serves the app document, then the router matches and the app requests employee data.
3. http://127.0.0.1:5187/api/health must remain JSON. http://127.0.0.1:5187/assets/missing.js must remain404.

Copy `hash-router/routed-directory` to `C:\react\routed-directory-hash`. This isolated alternative replaces BrowserRouter with the current HashRouter API in src/main.tsx.

```bat
cd /d C:\react\routed-directory-hash
npm ci
npm run build
node C:\react\routing-hosts\server.mjs --plain --port 5188 --root C:\react\routed-directory-hash\dist
```

Open http://127.0.0.1:5188/#/employees/e1 and reload. The HTTP host receives `/`; the browser's hash supplies the route. The shared local API remains running. Test the skip-to-content link as well: its focus handler preserves the router fragment.

Return to the main project afterward. Stop these local demonstration processes when finished. Do not carry the HashRouter substitution into the Data Mode app.
