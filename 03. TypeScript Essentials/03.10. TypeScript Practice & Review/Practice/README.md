# TypeScript Practice & Review — practice

Add child tickets at half price and accept saved whole-number counts from 1 through 6. Preserve existing categories, validation and module responsibilities.

## Work separately

Copy this complete Practice folder to C:\react\typescript-practice. Open starter in VS Code with its integrated Command Prompt. Run `npm ci` once in that folder, then `npm start` after each edit. Keep the main movie-booking project intact. This is a small follow-along/section challenge, not an additional mapped coding exercise.

## Acceptance criteria

- TicketCategory includes child, and the saved-data validator accepts it.
- getCategoryPrice returns half price for child.
- Saved counts must be numeric integers from 1 to 6 inclusive.
- Invalid count message: Ticket count must be a whole number from 1 to 6.
- 3 child tickets at base 12 plus fee 3 produce Total: 21.00.
- 7 child tickets, 0, fractions and numeric strings are rejected.
- firstOrUndefined(movies) remains Movie | undefined.

## Hints

- The union, category price branch and runtime category check need coordinated changes.
- Keep the existing typeof and integer checks; add the upper limit.
- The generic helper has no pricing responsibility and does not need editing.

## After your attempt

Compare the complete solution folder and solution/README.md. Get lecture-wise source through the “How to Download Source Code” article lecture in the Course Introduction section.
