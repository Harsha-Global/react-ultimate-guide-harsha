# Nested Mutation — coding exercise

Nested Mutation

Issue report
Changing a product's delivery fee to 25 also changes the original product's fee from 40 to 25. The original must remain available with its earlier details.

Repair changeDeliveryFee(item, fee). It receives a product with an existing delivery object and a numeric fee, and returns the updated product. Keep the function name and parameters.

Acceptance criteria
- Apply the requested fee, including zero.
- Preserve the original product and its delivery details.
- Return a new product object with a new delivery object.
- Keep the city and any other delivery fields, plus unrelated product properties.
- A second update must preserve both earlier versions.

Use the supplied Run tests button to check behavior. No new setup or package is needed. You only edit exercise.js; the HTML file loads it, and the provided evaluation supplies example calls.

After your repair, explain in one or two sentences what caused the original to change and why your correction prevents it. This explanation is a self-check; the automated tests assess the function's behavior.

Related lecture: Immutable Object Updates.
Allow about 5–10 minutes; this is an estimate, not a measured learner time.

## Local companion

Use this as an alternative to the native attempt, not a second required task. Copy this folder to `C:\react\lecture-12-practice`. Open `starter` in VS Code and run `node app.js` in its integrated Command Prompt terminal. The expected original fee is 40; the starter incorrectly prints 25. Repair only the function, rerun, and check both identity comparisons are false. Keep the main lecture project unchanged.

## Hints

Hint 1
Compare the original delivery fee before and after one call. Inspect the path used by the assignment inside changeDeliveryFee.

Hint 2
Recall the lecture's distinction between a new outer object and the references held by its properties. Which objects along the changed path need their own identities?

## After your attempt

Compare with `solution/app.js` and `solution/README.md`. Source route: course GitHub repository, via the “How to Download Source Code” article lecture in the Course Introduction section, then the section and lecture folders.
