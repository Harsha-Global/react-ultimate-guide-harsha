# Solution and reasoning

The group branch owns the required phone schema, so the individual branch remains unchanged. The form includes phone data only for a group, and maps the phone validation issue to an accessible field message. The shared request parser is also used by the API, so bypassing the form cannot bypass the requirement. The saved public summary continues to omit contact data.

This is a deliberately defined course input rule, not verification that a phone number exists or can receive a call. A real international-contact requirement may need a suitable phone library and a separate verification process. A type assertion does not perform either job.

## Checks

- Run npm run verify:group-contact with the matching local service. The unchanged starter is expected to fail the new requirement.
- Reject a missing, blank, alphabetic, too-short or too-long group phone. Accept the documented boundary lengths and formatted examples.
- In the browser, enter an invalid phone. Show the phone-specific message without losing other contact or attendee values.
- Correct the phone and try the full evening session. Retain the entire draft; retry the morning session and confirm two places.
- Book an individual visit without a phone. Check direct API rejection of a missing group phone, the unchanged duplicate-request behavior and the public summary. Build and lint.
