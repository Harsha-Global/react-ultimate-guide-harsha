# Closures & Stale State — setup

Continue the incoming main project `08.03. Batching & Lazy Initialization/movie-discovery` in `C:\react\movie-discovery`. This lecture's `movie-discovery` folder is the complete source for this lecture, for comparison or recovery. Do not overwrite personal changes blindly. The separate Product Explorer project and optional solutions are not the incoming source.

Open a Command Prompt terminal in VS Code, and run these separately:

```bat
cd /d C:\react\movie-discovery
npm ci
npm run dev
```

Use the Local URL printed by the development server. Installation is needed on the first copy or when the lockfile requires it, not for every edit. Save with Ctrl+S. Keep the course's existing toolchain and package-lock.json; this section makes no dependency migration. `npm run build` and `npm run lint` are optional local verification commands; no additional test tools are needed.

For prepared appearance, copy the entire `Styles/booking.css` to `src/index.css`, save, and verify the page. The current source already contains that exact CSS. The entry file already imports it. Check a narrow viewport and use Tab to see keyboard focus.

Separate demos/practice are complete projects. Copy the selected project into its own folder beneath `C:\react`, stop the previous server with Ctrl+C, open the new folder, and run the same commands from its root. Never copy a faulty App file into the main source. Reload the browser to begin a fresh experiment. Wait for a timer to complete before leaving its example.

Project folders supplied here:
- `movie-discovery`
- `Demonstrations/delayed-fixed/movie-discovery`
- `Demonstrations/delayed-stale/movie-discovery`
- `Demonstrations/quote-observation/movie-discovery` — eight-second observation copy; see its README. Copy into `C:\react\quote-observation`; the main project keeps its two-second delay.
