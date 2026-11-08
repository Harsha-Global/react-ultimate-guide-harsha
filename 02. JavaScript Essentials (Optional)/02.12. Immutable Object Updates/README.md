# 02.12. Immutable Object Updates — source code

`javascript-essentials/app.js` is the exact saved main file shown in the recording. It continues Spread Syntax, preserves the earlier product and changes the copied delivery city from Hyderabad to Pune. Fee stays 40 and name stays Desk Lamp. Product and delivery identities are different; the untouched tags array remains shared.

- `Checkpoints`: incoming completed 02.11 main, nested delivery data, and the completed immutable update before the verification messages.
- `Demonstrations/shallow-mutation`: the outer copy still shares delivery; prints Pune, Pune, false, true.
- `Demonstrations/lost-sibling`: replacing delivery without copying its sibling fields prints 40 and undefined.
- `Practice/C02 Nested Mutation/starter` and `solution`: complete runnable local examples, instructions, hints and solution explanation. The starter deliberately changes the original fee to 25. The solution preserves 40, returns 25 and gives both changed objects new identities.
- `Practice/C02 Nested Mutation/Udemy`: the separate native exercise starter and solution, HTML loader, supplied Jasmine evaluation, instructions, hints and explanation. Its evaluation runs in Udemy's exercise environment.

For a local example, open its own folder in VS Code and run `node app.js` in Command Prompt. No installation is required. Keep demonstrations and practice separate from the continuing main project. All code shown in this lecture is included.
