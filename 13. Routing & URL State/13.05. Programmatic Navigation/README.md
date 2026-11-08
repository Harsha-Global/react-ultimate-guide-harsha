# 13.05. Programmatic Navigation

The `routed-directory` folder contains the exact completed source recorded for this lecture. It continues the incoming search-parameter app and adds the QuickFind and ReturnLink components. Quick lookup validates the entered employee id before navigation; detail links preserve the filtered list address in history state; ReturnLink checks that state and uses `/employees` as its fallback.

Run `npm ci` inside `routed-directory`. Use separate terminals for `npm run api` and `npm run dev`, then open http://127.0.0.1:5183. The local API runs on port4183 and starts with the three sample employees. `npm run check`, `npm run lint -- src api vite.config.ts` and `npm run build` verify the project.

Source, styles, local fonts and learner reference diagrams are included. Narration, recordings and production tooling are separate. Application files retain the exact recorded source; the supplied standard `.gitignore` excludes generated dependencies and build output. This README provides the current lecture overview.
