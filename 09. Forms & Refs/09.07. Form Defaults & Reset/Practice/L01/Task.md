# Accessible Validation

Optional local build task, about 10–15 minutes. Begin with `Starter/movie-discovery`. The fields and validation rules work, but the form's accessible feedback is unfinished. Keep the existing draft, validation and defaults behavior.

Complete label/control associations using the existing generated prefix, connect error/help text, expose invalid fields, provide usable submission feedback and focus the first invalid field after submission. Use typed refs with null handling. Keep standard keyboard submission and explicit button types. Preserve entered values on failure, retain the last submitted snapshot when current edits change, and make reset restore loaded defaults and clear interaction feedback.

Acceptance: Tab through controls and submit with Enter; blank submission focuses Full name; a valid name with bad email focuses Email; a zero arrival value is accepted; labels focus their own fields; messages identify the problem in text; two instances have distinct IDs; a failed submission does not erase other input. Load Emily's defaults, edit, then reset. Ticket quantity/cart remain unchanged by a customer reset.

Hint 1: inspect field markup and the invalid branch in the submit handler. Hint 2: connect each ID/description pair and focus the relevant mounted ref in validation order.

Compare the complete `Solution/movie-discovery` after attempting the task. Manual keyboard and DOM checks are appropriate here. Announcements vary by browser and assistive technology; verify them with a real assistive-technology check if claiming that behavior. This local task also supplies the starter and solution for the optional A11 Udemy Assignment after Section 09.
