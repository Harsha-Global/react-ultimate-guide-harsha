# Admin Workspace — an inline product editor

The Admin Workspace loading its catalog from a local service and editing products inline: react-hook-form 7.89.0, @hookform/resolvers 5.9.1 and zod 4.6.5 installed exactly; the api and test:api scripts and the /api proxy in vite.config.ts; src/components/ProductEditor.tsx with React Hook Form and the Zod schema (labelled fields, help and error texts, server field errors, a form-level error that keeps the entries, the Saving state); the Edit product item in the Actions menu; and src/App.tsx with the loading, error and Retry catalog states, the editor and the Saved notice.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.
