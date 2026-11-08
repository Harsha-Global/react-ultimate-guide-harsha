# Responsive Layouts

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5190 (stop any other app using port 5190 first). No API or account is needed. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run dev` and open http://127.0.0.1:5190. Open the browser's device toolbar (Responsive) and try 390, 640, 1024 and 1280 px: the cards switch to a row at 640, the summary moves beside the catalog at 1024 and the products form two columns at 1280 (639, 1023 and 1279 px show the layout just before each change). Search for `lamp`: one product is shown while the summary still counts 4, 1 and 1. No width shows a horizontal page scroll bar.
