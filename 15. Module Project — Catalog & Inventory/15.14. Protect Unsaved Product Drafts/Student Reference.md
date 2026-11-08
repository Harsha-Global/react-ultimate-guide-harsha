# Protect Unsaved Product Drafts

`Completed/product-explorer` contains the exact source demonstrated in the video. `Starter/product-explorer` contains the incoming app before draft protection is added.

## Run the app

Use Node.js 22.22 or later. Inside either project, run `npm ci`, then `npm run api`. In a second terminal in the same project, run `npm run dev`. Open http://127.0.0.1:5185. Stop both processes before switching between copies, since they share ports.

The API runs on 4185 and Vite proxies `/api` to it. Assets are local. Dependency installation needs internet access. Keep the supplied lockfile.

## Check the unsaved draft choices

Open a product editor and change the price. Choose Cancel or another app destination. Keep editing should retain the draft. Discard changes and leave should navigate without saving. Returning all values to their initial values clears the dirty state.

Make another change and reload. The browser owns the reload/close warning, including its wording and display rules. Canceling it should keep the page and draft. A successful save should navigate without the in-app leave warning.

The dirty comparison is targeted to this small, stable form shape. It is not a general-purpose object equality algorithm. The navigation blocker checks pathname changes and permits the normal pending-save flow. The unload callback reads the current `isDirty` value through its dependency list.

## Check recovery

Run `node server/control.mjs fail` before a save or deletion. A failed save retains the draft; a failed deletion retains the product. Use `node server/control.mjs normal` and retry. A page-load failure offers Try again.

Finish with `npm run api:reset` to restore normal timing and the six seed products. Generated runtime data/control files are excluded from these copies; the first run starts from the seed catalog. Resetting the API does not clear browser bag or delivery preferences.

Checks: `npm run check`, `npm run lint`, `npm run build`.

## References

- [useBlocker](https://reactrouter.com/api/hooks/useBlocker)
- [useBeforeUnload](https://reactrouter.com/api/hooks/useBeforeUnload)
