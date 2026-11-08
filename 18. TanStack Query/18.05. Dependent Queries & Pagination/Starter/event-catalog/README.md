# EventDesk — event catalog

Use the Node engine declared in package.json. Copy this stage under C:\react\event-catalog and run `npm ci`. In the first terminal run `npm run api`; check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Run `npm run lint` and `npm run build`.

To restore the seeds in this copied practice project, stop its API, run `npm run reset`, then restart `npm run api`. Saved title/publication edits in its server/data.json are removed. Reload the browser to clear its old in-memory query cache. Keep main and exercise copies separate and run only one API on port 4088 at a time.

This is a supplied local course practice API, with controlled response delays. No external booking or public event is changed. The current pinned query package supports queryClient.query for imperative cache preparation. A route loader added later in this section and speculative prefetching use that method. Local font licenses and artwork remain in public/assets.

This is a separate starter or exercise copy. Use its enclosing brief and do not replace the main checkpoint with an optional solution.
