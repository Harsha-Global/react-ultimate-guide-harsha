# Variables & Expressions — lecture-wise source code

Continue your existing `C:\react\javascript-essentials` working folder on Windows. This reference folder contains the source code for the “Variables & Expressions” lecture in the JavaScript Essentials section.

Open your working folder in VS Code. Save `app.js` with Ctrl+S, then run the following command in the Command Prompt terminal in that folder:

```bat
node app.js
```

Expected output:

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
```

## What changed

The fixed product message now uses the `productName` and `unitPrice` variables declared with the `const` keyword, and the `quantity` variable declared with the `let` keyword. The multiplication expression inside each template literal calculates the total using the current values. The `log` method on the `console` object prints each completed label.

The first method call runs before the quantity reassignment. The second method call runs after it. The first line is already printed; changing the quantity does not rewrite that line.

The Console-only `total` variable illustrated a previously stored result. It is deliberately absent from the saved source, where the calculation is evaluated at each message. The invalid assignment to the `unitPrice` variable is a separate Console demonstration and is not part of this runnable file.

## Tools and practice

Use the Node.js 24 LTS environment from the “Setting the Environment” lecture. The saved app.js needs no npm package. The browser Console demonstration uses Google Chrome on google.com; no local page or server extension is needed. This is plain JavaScript; functions and parameters are introduced in the next lecture.

The separate practice starter, brief, hints and complete solution are under this lecture's `Practice` folder. Keep practice separate from the main `C:\react\javascript-essentials` folder.

For the course GitHub repository link, use the “How to Download Source Code” article lecture in the Course Introduction section. Download a ZIP through your browser or clone using Git. The repository uses section folders containing lecture folders. A downloaded reference copy can live under `C:\react\course-source`; keep it separate from your working folder.

## Browser Console

Open Google Chrome and go to https://www.google.com. Press **Ctrl+Shift+J** to open the developer Console. Enter each expression separately. Reload the page before a fresh attempt; clearing visible Console output alone does not reset variables. Continue to run the saved app.js with Node in the existing working folder.

The recording machine's existing Node.js 26.8.2 and npm 11.19.1 were retained. The curriculum's Node 24 LTS route remains valid for this standard JavaScript example; no runtime upgrade or package installation is needed.
