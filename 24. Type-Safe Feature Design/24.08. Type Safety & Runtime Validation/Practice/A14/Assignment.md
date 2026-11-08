# A14 — Add a Group Contact Rule

Require a useful contact phone for group bookings without changing individual-booking requirements.

## Client request

The studio now needs a phone number for the group contact. Individual visitors may still book without one. A direct API call must obey the same group requirement as the form.

## Your work

Add phone only to the group request schema. For this course requirement, trim outer spaces, allow digits, an optional leading +, spaces, parentheses and hyphens, and require 7–15 digits. Show a controlled phone field only for a group. Give field-specific feedback associated with that input, retain it after a failure, and keep pending/confirmed locking. Use the shared schema in the service and do not expose the phone in the public confirmation.

## Start and check

Run npm run api:slow and npm run dev in separate terminals. Open http://127.0.0.1:5210. Run npm run verify:group-contact in another terminal using that same variant. It resets the local practice data; run it before independent browser checks, not during a pending booking.

1. Run npm run verify:group-contact with the matching local service. The unchanged starter is expected to fail the new requirement.
2. Reject a missing, blank, alphabetic, too-short or too-long group phone. Accept the documented boundary lengths and formatted examples.
3. In the browser, enter an invalid phone. Show the phone-specific message without losing other contact or attendee values.
4. Correct the phone and try the full evening session. Retain the entire draft; retry the morning session and confirm two places.
5. Book an individual visit without a phone. Check direct API rejection of a missing group phone, the unchanged duplicate-request behavior and the public summary. Build and lint.

## Submit your explanation

1. What did you change?
2. Which checks did you run, and what did you observe?
3. Why does your chosen state owner or validation boundary fit this requirement?

Use the course source-code route in How to Download Source Code. The starter and full separate solution belong to this lecture’s Practice/A14 folder. Attempt and test your work before opening Solution. This is a manually reviewed assignment, not an automatic grader or an extra recorded solution lecture.
