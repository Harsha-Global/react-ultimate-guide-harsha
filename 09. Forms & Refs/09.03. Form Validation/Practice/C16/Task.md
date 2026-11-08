# Validation Functions

Optional build task; aim for 8–12 minutes, not a timed gate. Implement `validateCustomer` in `Local/Starter/validation.ts`. Return a field-error object; never change the argument. A valid draft returns an empty object. Report all invalid fields together, using useful nonempty messages.

Rules: a trimmed name is required; email must match the simple taught format (non-whitespace text, @, non-whitespace domain, a dot and suffix); arrival minutes must be nonblank and convert to an integer from 0 through 60 inclusive; the optional note may contain up to 200 characters. Preserve valid zero. The email check is a course rule, not proof that an address exists. TypeScript's draft type is supplied; keep the return contract.

Run the included checks. Try empty/whitespace inputs, zero, sixty, fractions and a long note. Compare `Local/Solution` only after your attempt.

Hint 1: inspect each raw field, then return errors by field name. Hint 2: check an empty numeric string before converting it; `Number("")` is zero.
