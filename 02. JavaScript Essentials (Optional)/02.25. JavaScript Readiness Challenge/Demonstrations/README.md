# Separate recording comparisons

Preserve the main project. Each subfolder contains a complete browser module project. Copy this Demonstrations folder to `C:\react\lecture-25-demos`, then open one comparison folder in VS Code. Stop the earlier server with Ctrl+C; run the same command in this folder, then reload the browser page. Do not copy an isolated app.js into the main folder.

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

## save-failure

Expected output:

```text
Selected entries: 1
Updated count: 5
Selected total: 90
Original total: 108
Original first count: 4
Closure prediction: 90, 80
Save attempt finished
Save failed: Basket save failed
```

## empty-selection

Expected output:

```text
Selected entries: 0
Updated count: 0
Selected total: 0
Original total: 108
Original first count: 4
Closure prediction: 90, 80
Save attempt finished
Saved total: 0
```

## Restore

Stop the comparison server, restart the same command in `C:\react\javascript-essentials`, reload the browser and confirm the main output listed in its README.
