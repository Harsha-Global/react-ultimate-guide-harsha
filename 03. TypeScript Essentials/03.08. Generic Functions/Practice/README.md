# Generic Functions

Replace the unknown-only signature with a generic firstOrUndefined<T> function. Accept an array of T and return T | undefined. Return the first item for a non-empty array, or undefined for an empty array. Do not copy, reorder, or modify the input. Do not use any, a type assertion, suppression comments, or separate overloads for each item type. Check both runtime results and the inferred result types for movie objects and numbers.

Expected results
- A number array returns its first number.
- A string array returns its first string.
- A movie array returns the original first object reference, preserving its property types.
- An empty array returns undefined.
- The result can be assigned to the matching element type | undefined; an unrelated property or incompatible result assignment is a type error.

How to work
Read the starter and make your attempt in exercise.ts. Use the exercise’s Run/Check control. A compiler error concerns the TypeScript contract; a failed result check means the observed behavior differs from the stated expectation. Read that feedback, change the source, and check again. You do not need to edit or learn the instructor’s test framework. Keep the function and type names used in the starter. Compare with the solution only after your attempt.

## Local route

Copy this activity folder to C:\react\typescript-practice. Open starter in VS Code. In its integrated Command Prompt, run `npm ci` once, then `npm start`. Keep the main movie-booking project unchanged. The starter contains only previously explained TypeScript and npm configuration. Expected checks are described above; the instructor-only Udemy harness is not a new required testing lesson.

## Hints

- Use one type parameter name for the array element and return item.
- The array can be empty, so include undefined in the return type.
- The first item is items[0]; no clone or mutation is needed.

## After your attempt

Open the separate solution folder and its explanation. Obtain lecture-wise source through the “How to Download Source Code” article lecture in the Course Introduction section. The actual repository URL remains pending.
