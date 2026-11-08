# Rendering comparison

Prepared observation lab for this lecture. This is separate from booking-studio, whose source is unchanged. Copy this folder to C:\react\rendering-demo on Windows. Run `npm ci`, `npm run build`, then `npm start`. Open http://localhost:5241/client. The server listens only on this computer. It does not call the booking API.

- `/client`: response root is empty; createRoot renders the workshop in the browser.
- `/server`: each request calls renderToString; hydrateRoot attaches React to matching initial markup. The initial counter is0 on both sides; clicking changes it only in the browser.
- `/static`: prerender.mjs rendered the disabled card during the build; the server reads that saved file. There is deliberately no browser script here. Static sites can also load JavaScript and hydrate; this sample isolates plain static delivery.

Inspect the original document response in the browser's Network panel or use View page source. Search for `class="workshop"` within the root: absent in client, present in server and static. The shared site header is ordinary HTML in every route, not evidence of React server rendering. The Elements panel shows the current DOM after browser rendering, so it is a different observation. Test the button twice in client and server; static deliberately has it disabled. Reload either interactive route to restore0.

This small synchronous renderToString demonstration does not implement streaming, server data loading, React Server Components, Server Functions, framework routing or production deployment. The later Next.js sections cover those framework responsibilities. `.server` is generated TypeScript output, not a source folder to edit. `npm run lint` checks original source; `npm run build` checks both browser and server TypeScript before building both outputs and the static page.

Primary references: https://react.dev/reference/react-dom/client/hydrateRoot and https://react.dev/reference/react-dom/server/renderToString .
