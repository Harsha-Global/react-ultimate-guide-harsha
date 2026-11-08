# Run this lecture

1. Copy `movie-discovery` into `C:\react\movie-discovery`, preserving its complete contents, including package-lock.json and dotfiles. Keep your earlier project copy separately if needed.
2. Open that folder in VS Code. In Command Prompt, change to it with `cd /d C:\react\movie-discovery`.
3. Run `npm ci` to install the exact locked dependencies. Run `npm run dev`, then open the address printed by Vite.
4. For author checks, run `npm run build` and `npm run lint`. A development page alone does not prove TypeScript correctness.

## Recovery

If the port is occupied, stop the other project’s dev server or use the new printed address; do not assume a fixed port. If the page appears stale after changing project copies, confirm the server folder and reload. If dependencies are missing, run npm ci from the folder containing package.json. Use the working Node environment already established in the course; the lockfile is the delivery’s version record.

Demonstrations and Practice are complete isolated projects. Run commands inside their actual project folder, never the lecture-package parent. Restore the main project after a temporary broken example. Do not copy hidden grading files into learner source.
