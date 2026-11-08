# Admin Workspace — Tailwind CSS set up

The Admin Workspace project with Tailwind CSS connected to Vite: the exact dev dependencies tailwindcss and @tailwindcss/vite (4.3.3), the tailwindcss() plugin beside react() in vite.config.ts, `@import "tailwindcss";` at the top of src/index.css (the local DM Sans and Manrope fonts kept) and the first utility classes in src/App.tsx.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
