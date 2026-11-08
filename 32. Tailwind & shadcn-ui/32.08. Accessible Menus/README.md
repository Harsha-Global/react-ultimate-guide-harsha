# Accessible Menus

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/OriginalCLIOutput: src/components/ui/dropdown-menu.tsx as the shadcn command created it for this lecture (with the license and provenance), so the local motion-safe and focus-outline changes are easy to compare.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run dev` and open http://127.0.0.1:5190. Tab to a product's Actions button and press Enter: focus moves into the menu. Use the arrow keys, Home, End and type a letter to move between the items; Escape returns focus to the same Actions button. Choose Review availability: the menu closes, the dialog opens with its heading focused, and closing it returns focus to Actions. Open product image (new tab) opens the image in a new tab.
