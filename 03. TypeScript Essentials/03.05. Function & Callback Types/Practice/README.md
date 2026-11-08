# Typed Callbacks

Complete studentRule so it returns 80% of its numeric subtotal. Complete priceTickets so it multiplies price by count, calls the supplied rule exactly once with that subtotal, and returns the rule’s result. This focused exercise has no booking fee. Keep the PricingRule contract and numeric parameter/return types. Do not call studentRule in place of the supplied rule, and do not use any, assertions, or suppression comments.

Expected results
- priceTickets(12, 2, studentRule) is approximately 19.2.
- A rule that returns its input makes priceTickets(12, 2, rule) return 24.
- A rule that subtracts 5 receives the subtotal 24 and returns 19.
- The supplied callback runs exactly once per caller invocation.
- The numeric callback contract rejects a callback that returns a string.

How to work
Read the starter and make your attempt in exercise.ts. Use the exercise’s Run/Check control. A compiler error concerns the TypeScript contract; a failed result check means the observed behavior differs from the stated expectation. Read that feedback, change the source, and check again. You do not need to edit or learn the instructor’s test framework. Keep the function and type names used in the starter. Compare with the solution only after your attempt.

## Local route

Copy this activity folder to C:\react\typescript-practice. Open starter in VS Code. In its integrated Command Prompt, run `npm ci` once, then `npm start`. Keep the main movie-booking project unchanged. The starter contains only previously explained TypeScript and npm configuration. Expected checks are described above; the instructor-only Udemy harness is not a new required testing lesson.

## Hints

- Compute price * count before calling rule.
- A function value is passed as an argument; rule(subtotal) invokes it inside the caller.
- The function type describes a numeric result. Keep that result as a number, not a formatted string.

## After your attempt

Open the separate solution folder and its explanation. Obtain lecture-wise source through the “How to Download Source Code” article lecture in the Course Introduction section. The actual repository URL remains pending.
