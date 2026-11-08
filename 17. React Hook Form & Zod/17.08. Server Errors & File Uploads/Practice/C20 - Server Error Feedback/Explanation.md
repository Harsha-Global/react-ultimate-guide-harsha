# Solution explanation

The repaired helper adds the email call only for an ApiError that contains a nonempty email message. That call attaches the useful correction to the right input and requests focus. The root.server call still runs afterward with the general error. An ordinary Error supplies its message; other failure values receive the fallback. No reset is performed, so the helper does not discard the visitor's draft. The native callback is a small test double for the taught setError interface; browser integration remains in the lecture project.
