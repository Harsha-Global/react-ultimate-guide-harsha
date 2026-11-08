# Admin Workspace — motion with a reduced-motion alternative

The Admin Workspace project with a brief entrance for the product details: Motion 14.0.0 (installed with --save-exact) animates the details body in src/components/ProductDetails.tsx (opacity and an 8 px rise over 0.22 s), while src/components/ui/dialog.tsx no longer animates the dialog shell. src/motionPreference.ts reads the prefers-reduced-motion media query and notifies subscribers of changes (static when unavailable); src/useMotionPreference.ts subscribes with useSyncExternalStore. With reduced motion the same content appears immediately (initial false, duration 0). motion-check.html with the verification folder samples the real component with a simulated preference; tests/motion.test.mjs checks the preference store (`npm run test:motion`).

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.
