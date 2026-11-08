# Admin Workspace — an accessible product review dialog

The Admin Workspace with a modal availability review for each product: src/components/ui/dialog.tsx from `npm exec --yes --package=shadcn@4.21.4 -- shadcn add dialog --yes` (its entrance and exit animations limited to motion-safe, a larger close button with a visible focus outline), lucide-react 1.54.0 and tw-animate-css 1.4.0 installed exactly, and src/components/ProductDetails.tsx: a Review availability trigger per card, the product name, description, image and details, the heading focused first, the content scrolling on short screens and a Done button.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.
