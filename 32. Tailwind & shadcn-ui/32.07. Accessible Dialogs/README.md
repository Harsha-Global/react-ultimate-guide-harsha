# Accessible Dialogs

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/Original CLI Output: src/components/ui/dialog.tsx as the shadcn command created it for this lecture (with the license and provenance), so the local motion-safe and close-button changes are easy to compare.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run dev` and open http://127.0.0.1:5190. Tab to a product's Review availability button and press Enter: the heading is focused. Tab and Shift+Tab stay inside the dialog; Escape closes it and focus returns to the same button. Close other reviews with Done and with the X. Check the dark theme and a short narrow viewport (390 × 360 in the browser's device toolbar): the dialog content scrolls.
