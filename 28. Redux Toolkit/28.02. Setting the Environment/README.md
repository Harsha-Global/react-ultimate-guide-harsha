# Setting the Environment

The completed application is the exact source demonstrated in the video.

- Starter/order-desk: the Order Desk project as completed in the previous lecture.
- Completed/order-desk: the project at the end of this lecture: `npm install --save-exact @reduxjs/toolkit@2.13.0 react-redux@9.3.0` added both packages to the dependencies and the lockfile. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy order-desk into your React workspace (for example C:\react\order-desk) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev` and open http://127.0.0.1:5188 (no API server is needed). Stop the server of any earlier copy first (same port). All five orders are sample records: selecting an order does not change a real order or collect money, and the in-memory state resets on reload. Validate with `npm run lint` and `npm run build`.

## Try it

Run `npm run build`: it succeeds with the new dependencies, and the queue still opens. Optionally install the Redux DevTools browser extension from the official Redux debugging page (Chrome or Edge); until a store exists its panel reports that no store was found.
