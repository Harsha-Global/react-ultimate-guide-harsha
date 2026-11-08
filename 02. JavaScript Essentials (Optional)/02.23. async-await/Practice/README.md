# async/await — practice

After awaiting the save, return its ten-percent-discounted total from showSavedTotal, while keeping the inner message showing the original saved total.

## Before editing

Copy this complete Practice folder to `C:\react\lecture-23-practice`, open its starter folder in VS Code and keep all supplied source files together. Stop the main server with Ctrl+C, run the same local server command in the starter folder, then reload the page. Use Ctrl+Shift+J for Console; save with Ctrl+S, reload with Ctrl+R.

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

## Acceptance criteria

- Keep the same order through Before call, Inside: before await, and After call.
- Keep Inside: saved 108.
- The caller receives 97.2.
- Use the existing createDiscount factory and preserve the save simulator and basket.

## Hints

1. Configure the discount function outside showSavedTotal.
2. Apply the transformation in the return expression after await; the caller’s then handler receives the transformed number.

## After your attempt

Compare with solution/README.md and the complete source in solution. Run the solution folder with the same server only after trying. Restore the main project’s server afterward. Use the “How to Download Source Code” article lecture in the Course Introduction section to reach lecture-wise source code; actual repository URL/publication remains pending.
