# Functions & Parameters — lecture-wise source code

Continue `C:\react\javascript-essentials` on Windows, using the tools from the “Setting the Environment” lecture. Open the folder in VS Code, save `app.js` with Ctrl+S, then run this command in the folder's Command Prompt terminal:

```bat
node app.js
```

Expected output:

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
```

## What changed

The `getLineTotal` function owns the multiplication previously repeated inside each label. Its `price` and `count` parameters receive the arguments supplied by each call. The `return` statement supplies a number to the caller; the template literal uses that number, and the `log` method on the `console` object prints the completed label.

The `count` parameter defaults to `1` when its argument is omitted or explicitly `undefined`. A supplied `0` stays `0`. The outer `quantity` variable remains `3` after the second label; the single-item call uses the parameter's default, not that outer variable. The function expects numeric inputs; the default does not validate them.

The correct function does not print anything by itself. Keep the temporary logging-only version separate; its complete comparison is in the lecture's `Demonstrations` folder. There is no dependency installation, new tool, framework scaffold or package.json for this lecture.

## Practice and source access

The separate `Practice` folder contains a familiar starter, brief, criteria, hints and complete solution for adding a four-item call. Keep it separate from the main working folder so the next lecture starts with these three messages.

Find the course GitHub repository link in the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository as a ZIP through your browser or clone with Git. Open the section folder, then this lecture's folder. Keep downloaded references under `C:\react\course-source`, separate from your own work.
