# Client & Server Rendering

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the guest details focus group).
- Completed/booking-studio: the same project at the end of the lecture; this lecture leaves it unchanged (the comparison runs in a separate demonstration project).
- Demonstrations/Rendering comparison/rendering-demo: the prepared comparison of client, server and static rendering (see its README). Copy it to C:\react\rendering-demo, run `npm ci`, `npm run build`, then `npm start`, and open http://localhost:5241/client. It needs no booking service and uses its own port.
- Practice/A12: the Preserve a Booking Draft assignment (Assignment.md, Rubric.md, the Starter and Solution projects and the solution explanation; see its README).
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

In the Rendering comparison project, click Add one idea twice on the Client rendering page: the saved-ideas count reaches 2. Open Server rendering and do the same. In Chrome DevTools, open the Network panel, reload each page, select its document request and open Response: the client page's root is empty, while the server and static pages already contain the workshop markup inside the root; the static page loads no script, and its button is disabled. Then read src/client.tsx (hydrateRoot for the server-rendered page, createRoot otherwise), src/Example.tsx and server.mjs (renderToString for /server). The booking studio itself works as in the previous lecture.
