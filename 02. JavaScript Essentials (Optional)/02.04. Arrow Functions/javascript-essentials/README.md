# Arrow Functions — lecture-wise source code

Continue `C:\react\javascript-essentials` in VS Code on Windows, using the tools introduced in the “Setting the Environment” lecture. Save the `app.js` file with Ctrl+S, then run `node app.js` in the folder's integrated Command Prompt terminal.

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
Summary: 3 items, total 75
```

## What changed

The `getLineTotal` function is now an arrow function assigned to a `const` variable. Its expression body returns the multiplication result implicitly. The original three labels and the `count` parameter's default stay the same.

The new `getLineSummary` function returns one object containing the `count` and `total` properties. It calls the `getLineTotal` function to calculate the total. The object literal is wrapped in parentheses so it is parsed as an expression. The `summary` variable holds the returned object; the `summary.count` and `summary.total` expressions read its properties for the new label. The outer `quantity` variable is already `3` at that call.

Keep the function variable declarations above their calls. These functions expect numeric inputs; they do not validate or convert them. A supplied count of zero stays zero; an omitted or explicitly undefined count uses the default of one.

The separate `Demonstrations` folder contains deliberately incomplete return examples and a corrected comparison. The separate `Practice` folder contains the starter and complete explained solution. Keep this main project correct for the “Callbacks” lecture.

## Source access

Use the course GitHub repository link provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP through a browser, or clone it with Git. Open the section folder, then this lecture's folder. Keep downloaded references under `C:\react\course-source`, separate from your working project.

No new dependency, package installation or project scaffold is needed for this lecture.
