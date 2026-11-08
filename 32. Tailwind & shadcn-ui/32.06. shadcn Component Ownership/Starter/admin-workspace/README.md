# Admin Workspace — an ActionButton with supported variants

The Admin Workspace with the exact class helpers class-variance-authority 0.7.1, clsx 2.1.1 and tailwind-merge 3.7.0: src/lib/utils.ts exports cn (clsx joined, then tailwind-merge), and src/components/ActionButton.tsx describes the supported button choices with cva (primary and outline variants, default and compact sizes, defaults, type="button" by default) around a native button. src/App.tsx uses the outline variant for Clear search and a compact primary Show all products button in the empty result; both reset the search and focus the field.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
