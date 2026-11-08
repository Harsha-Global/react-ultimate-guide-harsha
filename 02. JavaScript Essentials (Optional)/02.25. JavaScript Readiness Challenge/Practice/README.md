# JavaScript Readiness Challenge — practice

Complete the separate starter: retain in-stock entries, update p2 count to 5 immutably, calculate its total, await the save report, and display the matching outcome. Predict the two closure results before running.

## Before editing

Copy this complete Practice folder to `C:\react\lecture-25-practice`, open its starter folder in VS Code and keep all supplied source files together. Stop the main server with Ctrl+C, run the same local server command in the starter folder, then reload the page. Use Ctrl+Shift+J for Console; save with Ctrl+S, reload with Ctrl+R.

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

## Acceptance criteria

- Selected entries: 1; Updated count: 5; Selected total: 90.
- Original total: 108; Original first count: 4; original second count remains 3.
- Closure prediction: 90, 80 appears before Save attempt finished and Saved total: 90.
- Inspect the ok flag; show the real message on a failed save.
- Keep all helper modules and original data unchanged.

## Hints

1. Build the data flow one step at a time: filter, then map with an object copy, then call the existing total helper.
2. Await saveBasketReport(updatedItems); its resolved outcome can represent success or failure.
3. Each discount factory call has its own rate parameter.

## After your attempt

Compare with solution/README.md and the complete source in solution. Run the solution folder with the same server only after trying. Restore the main project’s server afterward. Use the “How to Download Source Code” article lecture in the Course Introduction section to reach lecture-wise source code; actual repository URL/publication remains pending.
