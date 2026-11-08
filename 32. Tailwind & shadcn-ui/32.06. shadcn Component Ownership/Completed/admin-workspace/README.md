# Admin Workspace — copied shadcn/ui components

The Admin Workspace with shadcn/ui components copied into the project: the @ alias in tsconfig.json, tsconfig.app.json and vite.config.ts, components.json at the project root, and src/components/ui/button.tsx, input.tsx and label.tsx from `npm exec --yes --package=shadcn@4.21.4 -- shadcn add button input label --yes`, with their imports cn 0.4.0 and radix-ui 1.7.0 pinned exactly. The copied button and input use the workspace's rounded-lg corners, heights and offset focus outline; src/index.css adds the accent, secondary and destructive tokens; src/App.tsx uses Button, Input and Label in place of the earlier ActionButton and native controls.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
