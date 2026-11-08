# Separate recording comparisons

Preserve the main project. Each subfolder contains a complete browser module project. Copy this Demonstrations folder to `C:\react\lecture-24-demos`, then open one comparison folder in VS Code. Stop the earlier server with Ctrl+C; run the same command in this folder, then reload the browser page. Do not copy an isolated app.js into the main folder.

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

## catch-rejection

Expected output:

```text
Failed: Basket save failed
```

## recover-and-rethrow

Expected output:

```text
Recovered outcome: false, Basket save failed
Adding context: Basket save failed
Outer received: Basket save failed
```

## logging-only

Expected output:

```text
Only logged: Basket save failed
Next handler received: undefined
```

## Restore

Stop the comparison server, restart the same command in `C:\react\javascript-essentials`, reload the browser and confirm the main output listed in its README.
