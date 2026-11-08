# Workspace Feature Challenge

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the independent Saved Table View assignment (Instructions.txt: the requirement, the checks, three responses and a self-review), its Starter (copy it to a new working folder, npm ci, then npm run test:challenge: the new checks fail until you add the feature) and its Solution with an explanation. Try the assignment before opening the Solution.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

Copy Practice's Starter project to a new working folder (for example C:\react\saved-table-view-challenge), open it in VS Code and run `npm ci`. Stop the guided project's API and dev server, then run `npm run api` (check http://127.0.0.1:5191/api/health) and `npm run dev` in the copy. Run `npm run test:challenge`: the saved-density checks fail by design. Follow Instructions.txt to make all six checks pass, keep the other checks green, and write the three responses before comparing with the Solution.
