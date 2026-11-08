# Connect the Packing Checklist

The completed application is the exact source demonstrated in the video.

- Starter/order-desk: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared test tests/checklist-ui.test.tsx copied into the project in the lecture. Copy the folder's contents into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk: the project at the end of this lecture. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).
- Practice: the Clear Completed Tasks assignment (Instructions, Starter, Solution and the written review).

## Run

Copy the project into your React workspace (for example C:\react\order-desk) and open it in VS Code. In its terminal run `npm ci`. Then run `npm run dev`; open http://127.0.0.1:5188. Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Submit an empty task (the alert asks for text), add "Inspect boxes", check it and remove it; the selected orders stay unchanged. Run `npm run test:run -- tests/checklist-ui.test.tsx`.
