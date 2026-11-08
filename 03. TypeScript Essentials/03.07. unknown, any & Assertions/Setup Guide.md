# unknown, any & Assertions — setup and recovery

## Existing environment

Use VS Code, Node 24.19.0 and npm from the JavaScript Essentials setup lecture. Work under `C:\react`, using the integrated **Command Prompt**. The local project uses TypeScript **7.0.2** and **@types/node 24.13.5**, pinned in package.json and package-lock.json. No global TypeScript installation, browser server, React framework or additional paid tool is needed.

## First project creation (Setting the Environment lecture)

```bat
cd /d C:\react
mkdir movie-booking
cd movie-booking
npm init -y
npm install --save-dev --save-exact typescript@7.0.2 @types/node@24.13.5
```

Open that folder in VS Code. Confirm trust for this folder if asked. Use File → Open Folder and Terminal → New Terminal; choose Command Prompt as the terminal profile. Add the package scripts/type setting and tsconfig.json explained in Code.md, then src/app.ts. Do not overwrite an unrelated existing folder. Keep the earlier JavaScript project separate.

## Continue, or install a downloaded copy

Continue the actual previous lecture source in `C:\react\movie-booking`; make this lecture’s demonstrated changes. If starting from a supplied lecture folder, copy the complete movie-booking folder, with all src files, package.json, package-lock.json and tsconfig.json. In that project’s terminal, install once:

```bat
npm ci
```

`npm ci` uses the lock file. It is for a supplied/locked project, while the earlier `npm install --save-dev --save-exact ...` established dependencies. Do not copy node_modules between machines. @types/node supplies type definitions, not another Node runtime.

## Normal workflow

Save source edits with Ctrl+S, then use:

```bat
npm run check
npm start
```

check runs `tsc --noEmit`: successful checking returns without a program message. start runs `npm run build && node dist/app.js`: compiler success is required before Node executes.

## Configuration responsibilities

- target/lib ES2022: language output level and built-in language definitions for this supported Node runtime.
- module NodeNext plus package type: module: emitted Node ESM rules.
- rootDir src and outDir dist: source and generated JavaScript locations.
- strict: the type checks taught in this section, including missing-value and unknown-catch handling.
- noEmitOnError: do not produce new JavaScript for a failed build; old dist files are not deleted.
- verbatimModuleSyntax: explicit separation of type-only imports and runtime imports.
- types node: include Node API/global definitions; browser DOM definitions are not selected by lib.
- include src/**/*.ts: select the project source.

Use the workspace TypeScript version in VS Code when available, and verify its reported version. The pinned npm command is the authoritative compiler check; editor diagnostics may differ if the bundled version is selected. Do not edit generated dist files or bypass failed builds with a direct stale `node dist/app.js` call.

## Expected main output

```text
Total: 31.80
Ticket count must be a positive whole number
```

## Comparisons and practice

Open one complete comparison/practice folder at a time. Run npm ci once there, then npm start. Intentionally broken comparisons are separate from the correct main project. Return to the main project folder and run it to restore its output. The Practice brief identifies starter and separate after-attempt solution.

If npm cannot find package.json, check the terminal directory. If tsc is missing, run npm ci in that folder. If the compiler reports an error, read its filename/line and correct the source before running; do not delete type checks or add any to silence it. Resolve installation/network failures before proceeding rather than presenting a failed install as complete.

Get lecture-wise source through the “How to Download Source Code” article lecture in the Course Introduction section. The actual repository URL and publication remain pending.
