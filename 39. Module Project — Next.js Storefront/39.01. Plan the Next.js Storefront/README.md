# Plan the Next.js Storefront

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the small basic setup (package, TypeScript settings, Next.js configuration, root layout, home page and global stylesheet).
- Client Design Kit: the client's handoff (the two Next Storefront Figma files with PDF, PNG and SVG references, the product photos and the Manrope and DM Sans fonts with their sources and licenses, and the import and font instructions). Version 1 is inspected in this video; version 2 returns in Configure Caching & Freshness.
- Support Files: the global and storefront stylesheets (app/globals.css, app/storefront.css), the product images and the licensed local fonts with their licenses and sources (public/assets, public/fonts), the Our story and Delivery pages (app/(store)/about, app/(store)/delivery) and the two not-found pages (app/not-found.tsx, app/(store)/not-found.tsx), copied into the project in the video.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

The storefront plan and the project's first structure: the supplied stylesheets, product images and fonts connected in the root layout (next/font/local: Manrope for headings, DM Sans for body text), and a (store) route group whose layout (app/(store)/layout.tsx) gives every public page the header with the ShopFront brand and the Our story and Delivery links, a skip link, the main content area with a loading fallback (Suspense) and the footer; the home page moved into the group with its project introduction, and the root and store not-found pages.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using port 3000 first. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1). This lecture needs no API and has no tests folder yet. To check a production build, stop the development server with Ctrl+C, then run `npm run typecheck`, `npm run build` and `npm start -- --port 3000`.

## Try it

Open http://localhost:3000: the home page, Our story and Delivery share the store header and footer. On a fresh page press Tab to reveal Skip to content and press Enter: focus moves to the main content. Narrow the window to check the small-screen layout. To follow the planning part, import Client Design Kit/Next Storefront - v1.fig into Figma (Drafts, Import) as Import and Font Instructions.txt describes.
