# 02.20. Modules & Imports — source code

- javascript-essentials contains the exact four saved files shown in the recording.
- Checkpoints/Before modules contains the complete incoming app.js, including all earlier comparisons. Run that standalone checkpoint with node app.js.
- Demonstrations contains both intentionally incorrect examples, wrong-export and missing-path, each with its complete four-file project.
- Practice contains the starter, complete solution and their instructions.

Open the desired example's own folder in VS Code. Save its files, open a Command Prompt there, and run:

    npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1

Open http://127.0.0.1:5500 in Chrome; use Ctrl+Shift+J to show Console. After source changes, save and reload with Ctrl+R. Stop this server with Ctrl+C before serving another example folder on the same port. See Setup Guide.md for the full instructions.

The correct main and starter print Catalog entries: 3, First line total: 72, and Basket total: 108. The solution also prints Practice total: 30 and Original first count: 4. The wrong-export example requests an internal name that is not exported; missing-path intentionally refers to price.js instead of pricing.js. Both fail before app messages run.

Keep practice and mistakes separate from the continuing main project. Try the practice before reading its solution. No node_modules, recordings or production assets are included.
