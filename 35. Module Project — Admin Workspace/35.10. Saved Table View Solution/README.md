# Saved Table View Solution

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace-project: the Admin Workspace project as completed in the previous lecture.
- Solution/admin-workspace: the independent solution to the Saved Table View assignment (the same solution as the assignment's own Solution folder). Copy it to its own working folder (for example C:\react\saved-table-view-solution); it never replaces your guided project.
- Completed/admin-workspace-project: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace-project) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

Copy Solution/admin-workspace to C:\react\saved-table-view-solution, open it in VS Code and run `npm ci`. Stop any other API or dev server, then run `npm run api` (check http://127.0.0.1:5191/api/health) and `npm run dev`. `npm run test:challenge` passes all six checks. Save a studio view with compact rows, switch to travel with comfortable rows and apply the saved view: studio and compact return. Press Back: travel returns while the density stays compact. Choose comfortable and reload the travel link: it stays comfortable. Open http://127.0.0.1:5190: studio and compact are restored once; Clear search keeps it cleared. The remaining regression checks, `npm run build` and `npm run lint` pass.
