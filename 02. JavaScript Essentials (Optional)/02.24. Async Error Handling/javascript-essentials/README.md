# Async Error Handling — lecture-wise source code

Handle rejected saves with useful outcomes, shared completion work, and an explicit choice between recovery and propagation.

Continue the existing browser module project at `C:\react\javascript-essentials`. Keep every supplied module and index.html together. Use the integrated Command Prompt and the previously taught local server command:

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

Open `http://127.0.0.1:5500/` in Chrome, press Ctrl+Shift+J for Console, save edits with Ctrl+S and reload with Ctrl+R. Stop a server with Ctrl+C before starting it in another folder. See the parent Setup Guide.md for full instructions and alternate-port recovery.

## Expected Console output

```text
Save attempt finished
Success: true, total: 108
Save attempt finished
Success: false, message: Basket save failed
```

The source for each lecture is available through the “How to Download Source Code” article lecture in the Course Introduction section. The actual repository URL/article publication remains pending; no URL is invented. Keep separate demonstration and practice files separate from the main source.
