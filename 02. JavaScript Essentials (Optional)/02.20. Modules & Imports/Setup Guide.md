# Browser modules — setup and reference

Use the Node.js/npm tools and VS Code installed in the Setting the Environment lecture. Work in `C:\react\javascript-essentials` on Windows, using VS Code’s integrated Command Prompt terminal. This example adds a small local HTTP server; no global installation, bundler, framework or package.json is needed.

## Files beside one another

```text
javascript-essentials/
  index.html
  app.js
  products.js
  pricing.js
```

`index.html` loads `app.js` through `<script type="module" src="./app.js"></script>`. Its heading and Console reminder are the page UI. The app imports the data and functions; its results appear in the browser Console. Keep the files together and save all edits before loading the page.

## Start the server

In the integrated Command Prompt terminal at the project folder, enter:

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

- `npx` comes with npm. It runs the named package; first use needs internet access to download/cache the utility.
- `--yes` accepts npm’s package prompt.
- `http-server@14.1.1` pins the free utility version used here.
- `.` serves the terminal’s current folder.
- `-a 127.0.0.1` binds to the local loopback address.
- `-p 5500` selects the local port.
- `-c-1` disables the utility’s response caching for the examples.

Wait for `http-server version: 14.1.1` and `Available on: http://127.0.0.1:5500`. Keep that terminal running. The first download may display package progress and a dependency deprecation warning; successful startup is identified by the local address, not by the absence of every warning.

In Chrome, open `http://127.0.0.1:5500/`. Press Ctrl+Shift+J to open Console. Expected output:

```text
Catalog entries: 3
First line total: 72
Basket total: 108
```

Save a code edit with Ctrl+S, then reload Chrome with Ctrl+R. Use Ctrl+C in the server terminal to stop it. For a different demonstration or practice project, stop the server, change the terminal folder, and start the same command there. Open that project’s local address and reload.

## If the page does not run

- A `file://` address means the HTML was opened directly. Use the HTTP address from the running local server.
- If a port-in-use error appears, stop an earlier server you started. Alternatively, change `-p 5500` to `-p 5501` and open `http://127.0.0.1:5501/` consistently.
- If npx is not recognized, reopen the terminal after the earlier Node.js installation, and verify `node --version` and `npm --version` using that lecture’s setup route.
- If first-use download fails, read the npm network error and retry once connectivity is available; waiting for a server address is part of the setup.
- A module path error/404 means the requested file could not be loaded. Check its relative path, filename and `.js` extension.
- An export-name error means the selected name is not provided by that module. Import `basket`, the public export name, rather than the internal `removedBasket` name.
- A favicon 404, if displayed, concerns the browser’s optional tab icon. Our page supplies no icon; compare the three app messages when verifying the JavaScript example.

## Source access

Use the course GitHub repository through the “How to Download Source Code” article lecture in the Course Introduction section. Open this section, then the Modules & Imports lecture folder. The complete Practice solution is separate, for comparison after your attempt.

## Technical references

- [MDN JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [http-server official project and options](https://github.com/http-party/http-server)
