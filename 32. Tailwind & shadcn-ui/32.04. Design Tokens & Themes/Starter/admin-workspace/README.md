# Admin Workspace — a responsive catalog layout

The Admin Workspace catalog laid out for every width with Tailwind's responsive prefixes, in one DOM tree: a whole-catalog summary (an aside with All products, Low stock and Unavailable counts computed from the full product list) above the search and results on narrow screens and beside them from the lg breakpoint, two product columns from xl, narrow-first padding and heading sizes, and src/ProductCard.tsx stacking its image, description and availability on narrow screens and laying them out in a row from sm.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
