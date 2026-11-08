# Union Narrowing

Implement selectedTicketTotal. A standard ticket uses the supplied price. A student ticket uses 80% of that price. Multiply the selected ticket price by count. A null category returns undefined before doing the calculation. This focused task has no booking fee. Keep TicketCategory as exactly standard | student, and retain null at the selection boundary. Do not use any, assertions, suppression comments, or widen the category to string.

Expected results
- Standard: price 12, count 2 returns 24.
- Student: price 12, count 2 returns approximately 19.2.
- A null category returns undefined, not zero.
- A standard selection with price 0 returns 0.
- An unsupported category string is rejected by the type contract.

How to work
Read the starter and make your attempt in exercise.ts. Use the exercise’s Run/Check control. A compiler error concerns the TypeScript contract; a failed result check means the observed behavior differs from the stated expectation. Read that feedback, change the source, and check again. You do not need to edit or learn the instructor’s test framework. Keep the function and type names used in the starter. Compare with the solution only after your attempt.

## Local route

Copy this activity folder to C:\react\typescript-practice. Open starter in VS Code. In its integrated Command Prompt, run `npm ci` once, then `npm start`. Keep the main movie-booking project unchanged. The starter contains only previously explained TypeScript and npm configuration. Expected checks are described above; the instructor-only Udemy harness is not a new required testing lesson.

## Hints

- Check category === null first, and return from that branch.
- On the remaining path, category is a TicketCategory.
- Compare the category to student before applying 0.8; leave standard unchanged.

## After your attempt

Open the separate solution folder and its explanation. Obtain lecture-wise source through the “How to Download Source Code” article lecture in the Course Introduction section. The actual repository URL remains pending.
