# Admin Workspace — semantic tokens and a light/dark theme

The Admin Workspace with semantic colour tokens and a theme preference: src/index.css defines the light and dark token values (:root and [data-theme="dark"]), maps them to Tailwind colours with @theme inline and points the dark variant at the data attribute; the components use the semantic classes (bg-card, text-foreground, border-input, outline-ring ...). src/theme.ts validates, resolves, reads and saves the preference and connects it to the system setting; src/useTheme.ts gives React one preference to manage; the Theme select in src/App.tsx offers System, Light and Dark.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
