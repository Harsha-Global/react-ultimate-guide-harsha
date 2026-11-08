# 09.04. Touched, Dirty & Submission State — Windows setup

Incoming main checkpoint: `09. Forms & Refs/09.03. Form Validation/movie-discovery`. The complete outgoing main is movie-discovery in this lecture folder. Keep personal work separate when comparing checkpoints.

In VS Code, open C:\react\movie-discovery and a Command Prompt terminal. Run separately:

```bat
cd /d C:\react\movie-discovery
npm ci
npm run dev
```

Install on a new copy or when the lockfile requires it; do not migrate package versions. Open Vite’s printed Local URL. Save with Ctrl+S. `npm run build` and `npm run lint` are optional local verification commands; no additional test tools are needed.

Copy the entire Styles/booking.css to movie-discovery/src/index.css, replacing its contents. Save with Ctrl+S. src/main.tsx already imports ./index.css. Check the finished appearance in the browser and use Tab to see keyboard focus; the lecture applies these styles without a declaration-by-declaration CSS walkthrough.

StrictMode’s extra setup/cleanup behavior requires the development server, not the production preview. Timers use nominal delays; wait for the observable result.

Project locations:
- `movie-discovery`
