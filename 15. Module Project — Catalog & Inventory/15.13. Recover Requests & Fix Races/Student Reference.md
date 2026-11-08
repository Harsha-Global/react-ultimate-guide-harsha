# Recover Requests & Fix Races

The main ShopFront project is unchanged. The isolated request-race example contains the exact fixed source demonstrated in the video and the supplied faulty comparison.

## Run a project

Use Node.js 22.22 or later. Each project has a lockfile with the course versions. In its folder, run `npm ci`, then `npm run api`. In a second terminal in that same folder, run `npm run dev`. Open http://127.0.0.1:5185.

Stop both running processes before switching copies: all copies use the same ports. The API serves on port 4185 and Vite proxies `/api` to it. Images and fonts are local. Dependency installation needs internet access.

## Main project recovery checks

Change a price in the editor. Run `node server/control.mjs fail` before saving: the failure keeps the draft. Run `node server/control.mjs normal` and save again. Try a failed deletion: the row should remain and its confirmation control should explain the error.

## Request-race investigation

Start `Demonstrations/Faulty/product-explorer`, run `node server/control.mjs race`, then open http://127.0.0.1:5185/race-lab. Choose Search L, then Search Lamp quickly. The older response replaces the current result. Compare with `Demonstrations/Fixed/product-explorer` using the same steps.

The fixed effect creates its own AbortController and active flag, forwards the signal, checks active in every completion callback, and invalidates/aborts in cleanup. The latest Lamp result remains after the slow request would have returned. Leave the page while pending to check cleanup on removal.

## Return to the main app

Restore `node server/control.mjs normal`, stop the isolated copy and run the main project. Its loaders already pass the navigation request signal through the API helper to fetch. Use `node server/control.mjs slow` to try two destinations in quick succession. Finish in normal mode.

Cancellation is not an undo operation for a server write. Use confirmed server data after the operation or a later page load.

## Local API data

Generated data/control files are intentionally excluded. First run starts with the six seed products. `npm run api:reset` restores seed data and normal timing; it does not clear browser bag/delivery choices. Existing API practice changes persist across server restarts.

Checks: `npm run check`, `npm run lint`, `npm run build`.

## References

- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Router race conditions](https://reactrouter.com/explanation/race-conditions)
