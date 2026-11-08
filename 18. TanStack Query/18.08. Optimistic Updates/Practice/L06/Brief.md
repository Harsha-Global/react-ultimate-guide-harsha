# L06 — A rejected publication leaves the wrong badge

Issue report: In the supplied starter, choose Food and open Supper club. Click Publish workshop. The badge changes, then the server returns a rejection about venue approval. The screen continues to show the workshop as published. It should return to the state the server still has, while keeping the error visible.

Work in this separate Starter/event-catalog copy. Reproduce the issue, use the Network panel and the visible states to locate the cause, make a focused repair, then verify the result. Explain the cause and your correction in one or two sentences. Try before reading Hints.md or the solution.

## Run

Copy the isolated project under C:\react; stop the main catalog's terminals first to free its ports. In the copied project run `npm ci`. Run `npm run api`, check `http://localhost:4088/api/health`, then run `npm run dev` in a second terminal and open `http://localhost:5188`.

The supplied practice API delays writes so the intermediate state is visible. Supper club rejects publication; Bread and conversation accepts it. To restore the seed before another attempt, stop the API, run `npm run reset`, and start the API again. This resets only this copied practice database.

## Acceptance evidence

- A rejected publication restores the displayed draft badge and keeps a useful error message.
- The server record remains a draft; refreshing the page is not required to repair the display.
- Bread and conversation can be published and unpublished successfully.
- Pending controls prevent overlapping editor writes to the same event, including leaving and returning to its editor.
- Existing title validation and rejected-title draft preservation still work.
- Explain the cause, the correction, and the observed checks. Screenshots or written observations are enough at this stage.

Keep this practice separate from the main course checkpoint. The complete runnable comparison is in Solution/event-catalog; Review.md explains it after your attempt.
