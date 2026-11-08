# 10.05. Stale Closures & Effect Loops

The stale-timer fault freezes after its first decrement. Its solution uses one timeout per tick with complete dependencies. The object-loop fault intentionally repeats setup up to its safety cap. Its solution moves the constant options object outside the component; allow for the extra development StrictMode cycle. Keep main focus-desk unchanged and continue the course from it.

## Projects

- `focus-desk`
- `Starter/focus-desk`
- `Demonstrations/stale-timer/focus-desk`
- `Solutions/stale-timer/focus-desk`
- `Demonstrations/object-loop/focus-desk`
- `Solutions/object-loop/focus-desk`

`focus-desk` is the correct completed checkpoint. `Starter` contains the previous completed checkpoint. The demonstration and solution folders are isolated copies; do not continue the course from a deliberate fault.

## Run

In one project folder, run `npm ci`, then `npm run dev`. Open the local address shown in the terminal. Stop that server before opening another project. `npm run check` checks TypeScript, `npm run lint` runs oxlint, and `npm run build` creates the production build.

See `Thought Checks.md` and `Reference Guide.html` for review. Generated dependencies and build output are intentionally excluded.
