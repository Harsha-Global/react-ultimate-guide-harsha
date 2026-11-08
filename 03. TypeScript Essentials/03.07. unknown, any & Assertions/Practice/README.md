# Unsafe Assertions

Reproduce the bug: savedTicketTotal accepts a saved string ticketCount and calculates a total, because parseTicketRequest only asserts a type. Fix that one validation boundary. Parse into unknown, require a non-null object, inspect the required properties, require a positive whole-number ticketCount, and accept only standard or student. Return a newly constructed TicketRequest after the checks. Keep savedTicketTotal unchanged. Reject invalid counts with "Ticket count must be a positive whole number", invalid categories with "Choose a supported ticket category", and non-objects with "Booking data must be an object". Let malformed JSON throw its parsing error. Do not convert numeric strings, use any, use an assertion, or suppress type errors.

Expected results
- A standard request with 2 tickets returns 27.
- A student request with 3 tickets returns approximately 31.8.
- A string count, zero, a negative number, and a fraction are rejected.
- A missing property, unsupported category, and null are rejected with the specified useful messages.
- Malformed JSON is rejected; the original savedTicketTotal function is unchanged.

How to work
Read the starter and make your attempt in exercise.ts. Use the exercise’s Run/Check control. A compiler error concerns the TypeScript contract; a failed result check means the observed behavior differs from the stated expectation. Read that feedback, change the source, and check again. You do not need to edit or learn the instructor’s test framework. Keep the function and type names used in the starter. Compare with the solution only after your attempt.

Follow reproduce → locate → fix → verify → explain. First observe that the invalid saved request reaches the total. Locate the assertion at the data boundary, fix it with the checks, verify valid and invalid cases, and explain why the assertion did not validate the data.

## Local route

Copy this activity folder to C:\react\typescript-practice. Open starter in VS Code. In its integrated Command Prompt, run `npm ci` once, then `npm start`. Keep the main movie-booking project unchanged. The starter contains only previously explained TypeScript and npm configuration. Expected checks are described above; the instructor-only Udemy harness is not a new required testing lesson.

## Hints

- The assertion changes the checker’s view, not the parsed value.
- Check typeof value and null before using the in operator.
- Check property existence and typeof before Number.isInteger and the range check.
- Build the returned object from the narrowed properties.

## After your attempt

Open the separate solution folder and its explanation. Obtain lecture-wise source through the “How to Download Source Code” article lecture in the Course Introduction section. The actual repository URL remains pending.
