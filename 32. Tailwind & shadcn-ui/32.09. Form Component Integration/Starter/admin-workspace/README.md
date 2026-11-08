# Admin Workspace — an accessible product actions menu

The Admin Workspace with a keyboard-accessible Actions menu on each product: src/components/ui/dropdown-menu.tsx from `npm exec --yes --package=shadcn@4.21.4 -- shadcn add dropdown-menu --yes` (its animations limited to motion-safe and a visible focus outline on every item), the popover colours in src/index.css, and src/components/ProductActions.tsx: the menu with the product name, Review availability (which opens the review dialog once the menu has closed and returns focus to the Actions button afterwards) and Open product image (new tab). src/components/ProductDetails.tsx now exports the dialog content only (ProductDetailsContent).

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
