# UI Library Choices

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files/mui-comparison: a separate Material UI example of the same product form (@mui/material 9.5.0 with Emotion), opened and run in the lecture. In its folder run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5192. It previews form values locally and does not call the catalog API.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the Accessible Stock Alert assignment (Instructions, API Contract, Hints, Starter, Solution and the solution explanation). Attempt it in the Starter before opening the Solution.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

Run the guided project as above and the Material UI example on 5192 side by side. In both, clear the product name and submit with the keyboard: compare the labels, error messages and where focus goes. Reset the Material UI preview and confirm the name field is focused again.
