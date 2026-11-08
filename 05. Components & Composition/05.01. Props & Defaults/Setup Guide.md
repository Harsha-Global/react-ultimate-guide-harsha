# Setup and recovery — Props & Defaults

## Continue the main project

Work in `C:\react\movie-discovery`, using VS Code and its integrated **Command Prompt**. Continue the preceding lecture’s completed source; do not reset the working project before making the narrated changes.

The bundled `movie-discovery` folder is this lecture’s complete outgoing checkpoint. It excludes generated dependencies and builds. To open it separately:

```bat
npm ci
npm run dev
```

Use Vite’s reported Local address, not a hard-coded port or a file URL. Keep the terminal running. Stop with Ctrl+C. Save source files to update the development view. For a checked build and its preview:

```bat
npm run lint
npm run build
npm run preview
```

An explicit npm run check command is also provided.
`preview` uses the most recent successful `dist` output. Rebuild after editing. A failed build may leave older output on disk; do not mistake it for a fresh build. Preview is local inspection, not production hosting.

## Tested toolchain

Use the supplied project files and lock file for a reproducible toolchain. Exact dependency requirements are recorded in package.json and package-lock.json. TypeScript is project-local; the earlier Node project keeps its own compiler version/configuration. Strict checking is explicitly enabled in both Vite TypeScript configurations.

The React TypeScript template uses **Oxlint**, not the older ESLint template. Fresh scaffolds may resolve different package ranges later; the supplied locked checkpoint is the reproducible baseline.

## React Developer Tools in Chrome

Open [React’s official extension instructions](https://react.dev/learn/react-developer-tools), follow the Chrome link, select Add to Chrome, review and confirm the extension dialog, wait for completion, refresh the running application, open DevTools with Ctrl+Shift+J, and find Components (possibly under the overflow menu). If already installed, confirm it is enabled.

## Separate experiments

Open each Demonstrations or Practice project in its own folder, install its lock file with npm ci, and run commands from that folder. Deliberately broken examples are labelled and must not become the main checkpoint. No global dependency installation is needed. Avoid overwriting an existing learner folder with a checkpoint containing later code.
