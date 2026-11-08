# Virtualized Lists

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture (unchanged in this lecture).
- Starter/virtual-list-lab: the supplied Virtual List Lab with its ordinary list (all 1,000 rows mounted). Copy it into your React workspace (for example C:\react\virtual-list-lab) and open it.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.
- Completed/virtual-list-lab: the Virtual List Lab at the end of this lecture.

## Run

Virtual List Lab: copy Completed/virtual-list-lab into your React workspace (for example C:\react\virtual-list-lab), open it in VS Code and run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5192. Validate with `npm run lint` and `npm run build`. The Admin Workspace project runs as in the previous lecture (`npm run api` and `npm run dev`, http://127.0.0.1:5190).

## Try it

In the lab, inspect the list in the browser's Elements view: 8 rows mounted at the top, the list 72,000px tall. Scroll, choose Last record (record 1000), use Page Up and Page Down in the focused list, then First record. Check the dark theme and a 390 px layout. Choose Show complete list (1,000 rows mounted), then switch back: the list returns to the top with 8 rows.
