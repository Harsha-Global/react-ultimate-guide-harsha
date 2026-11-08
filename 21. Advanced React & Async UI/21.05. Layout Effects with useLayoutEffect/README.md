# Layout Effects with useLayoutEffect

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the guest name field).
- Completed/booking-studio: the same project at the end of the lecture, with the materials help (src/MaterialsHelp.tsx: the What should I bring? trigger and a help panel that measures its position with useLayoutEffect before the browser paints) below the session choices. Keep it for the next lecture.
- Supplied/MaterialsHelp markup.tsx: the prepared trigger and panel markup, pasted into src/MaterialsHelp.tsx after its imports in the video.
- Styles: the updated prepared stylesheet with the help panel's styles (already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Click What should I bring?: the help panel opens beside the button and its close button receives focus. Scroll the page: the panel follows the button. Make the browser window narrow: the panel stays inside the visible page. Press Escape, or click Close materials help: the panel closes and the focus returns to the trigger button.
