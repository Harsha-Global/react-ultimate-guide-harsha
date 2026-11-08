# Run this lecture

1. Copy `product-explorer` into `C:\react\product-explorer`, preserving its complete contents, including package-lock.json and dotfiles. Keep your earlier project copy separately if needed.
2. Open that folder in VS Code. In Command Prompt, change to it with `cd /d C:\react\product-explorer`.
3. Run `npm ci` to install the exact locked dependencies. Run `npm run dev`, then open the address printed by Vite.
4. To check the project, run `npm run build` and `npm run lint`. A development page alone does not prove TypeScript correctness.

## Recovery

If the port is occupied, stop the other project’s dev server or use the new printed address; do not assume a fixed port. If the page appears stale after changing project copies, confirm the server folder and reload. If dependencies are missing, run npm ci from the folder containing package.json. Use the working Node environment already established in the course; the lockfile is the delivery’s version record.

Demonstrations and Practice are complete isolated projects. Run commands inside their actual project folder, never the lecture-package parent. Restore the main project after a temporary broken example.

## Client handoff resources

Use Figma Starter as a solo author/student in Drafts. Import each supplied .fig through the file-browser import action and open the named original or revised page. PDF/PNG copies support offline reference. Both native files passed export/reimport checks. See Wireframes/README.md in 07.01 or 07.03 for the verified import steps and frame names. One .fig contains all frames for that design revision.

## Prepared CSS

The complete stylesheet is in [Styles](Styles/README.md). Copy it into src/index.css at the narrated stage and save. The entry file already imports it. Check the visual result; individual CSS declarations need no walkthrough.
