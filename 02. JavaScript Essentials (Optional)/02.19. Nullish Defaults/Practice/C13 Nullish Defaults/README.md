# Nullish Defaults — coding exercise

Nullish Defaults

Issue report
A saved selection has quantity 0, an empty label, and showDetails set to false. Restoring it unexpectedly changes those choices to quantity 1, the label "Untitled", and showDetails true. The saved choices should remain available.

Repair restoreSelection(saved). The saved argument is always an object. Each of its three fields may contain its intended value, null, undefined, or be absent. Valid quantities are non-negative whole numbers, labels are strings, and showDetails is Boolean. No parsing or validation of other input types is required.

Acceptance criteria
- Return an object with quantity, label and showDetails.
- Preserve valid 0, empty-string and false choices.
- Use defaults 1, "Untitled", and true only for a null, undefined or absent field.
- Preserve other provided values for those fields.
- Leave saved unchanged and keep calls independent.

Reproduce the issue, inspect the function, and make a focused repair. Keep the supplied name and parameter. Edit exercise.js and use Run tests. The supplied HTML loads it and the provided evaluation supplies example calls; no extra setup or tests are required from you.

After your repair, explain in one or two sentences why the original replaced valid choices and why the repair preserves them. The explanation is a self-check; automated checks assess the function's behavior. Use hints before comparing with the complete explained solution.

Related lecture: Nullish Defaults.
Allow about 5–10 minutes; this is an estimate, not a measured learner time.

## Local companion

This is an alternative to the native attempt, not a second required exercise. Copy this folder to `C:\react\lecture-19-practice`. Open `starter` in VS Code. Save `app.js` with Ctrl+S and run `node app.js` in its integrated Command Prompt terminal. Keep the main lecture project unchanged.

Expected output after your attempt:

```text
Quantity: 0
Label: []
Show details: false
Missing quantity: 1
Missing label: [Untitled]
Missing details: true
Original quantity: 0
```

## Hints

Hint 1
Trace the three saved choices through the expressions that build the result. Which expressions choose a fallback even though a value is present?

Hint 2
Recall the lecture's difference between testing for any falsy value and testing specifically for null or undefined. Which condition matches the issue's acceptance criteria?

## After your attempt

Compare with `solution/app.js` and `solution/README.md`. Use the course GitHub repository route from the “How to Download Source Code” article lecture in the Course Introduction section, then open this section and lecture folder.
