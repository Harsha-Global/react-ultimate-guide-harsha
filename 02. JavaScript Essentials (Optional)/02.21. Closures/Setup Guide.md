# Run a browser-module example

Use VS Code and the Node.js/npm tools installed in Setting the Environment. Open the particular example folder containing index.html, app.js, products.js and pricing.js. In VS Code's integrated Command Prompt terminal, start the same local server used in the previous lecture:

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

`npx` comes with npm. Its first use needs internet access to download/cache the pinned utility; no global installation is needed. The dot serves the current folder, the address binds to this computer, and `-c-1` disables response caching. Wait for the server's available address.

Open http://127.0.0.1:5500/ in Chrome. Press Ctrl+Shift+J to inspect Console. Use Ctrl+S to save code, then Ctrl+R in Chrome to reload it. Leave the server terminal running while using the page. Stop it with Ctrl+C before serving another example on the same port.

Expected main output:

```text
Catalog entries: 3
First line total: 72
Basket total: 108
Ten percent: 90
Twenty percent: 80
Ten percent again: 180
Discounted basket: 97.2
```

If port 5500 is in use, stop your earlier server or use `-p 5501` and open http://127.0.0.1:5501/ consistently. Do not open index.html through file://; imports need the local HTTP server. If npx is not recognized, reopen the terminal after installing Node.js and verify node and npm using the earlier setup lecture. A module-path error usually means a file name, relative path or .js extension is wrong. Keep all four files together. The outside-scope example deliberately produces its documented ReferenceError.

The course's How to Download Source Code article explains access through the course repository. Open this section and the Closures lecture folder, then the desired example. The downloaded examples can be run in any local folder; C:\React\javascript-essentials is the instructor's continuing main folder.
