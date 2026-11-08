# Protect a group booking

A studio organizer books places for Jordan and Casey. Add a component test that proves the real form sends the complete group request and displays the returned two-place confirmation. Use the existing test setup and MSW. Do not replace the request helper or schema with a fake function.

Open `Starter/booking-studio`, run `npm ci`, and implement `tests/group.assignment.test.tsx`.

Acceptance checks:

- Render a group draft with a nonempty group name, two distinct valid attendee UUIDs and names, and the morning slot.
- Enter valid contact details through accessible textbox queries and submit the form.
- Capture the intercepted POST body. Check its runtime validity, group kind, group name, both attendee entries, contact details and slot. Do not hardcode the form's generated requestId.
- Return a valid group confirmation with two places. Await the real confirmation heading and check the two-place morning result.
- Keep handlers isolated through the supplied reset hook; run the whole test suite and the test type check.
- Temporarily return one place from the mock response: your result assertion must fail. Restore two and confirm success. Explain what this client test does and does not prove about the real backend.

Run `npm run test:run -- tests/group.assignment.test.tsx`, `npm run test:run`, and `npm run check:tests`. Try your solution before comparing `Solution/booking-studio`.

Rubric: outgoing request and real schema 40%; visible result 25%; awaited actions and isolated test state 25%; clear names and explanation 10%. Estimated effort: 25–40 minutes.

Submission questions:

1. Which assertion would fail if an attendee disappeared from the outgoing body?
2. Why wait for the confirmation before asserting the displayed count?
3. Does the mocked response prove the actual server calculated two places? Explain your remaining check.

Instructor answers: the objectContaining assertion includes the complete attendees array; the success heading establishes the asynchronous form result; no, the handler supplies the response, so the real-service journey/contract needs a separate check.
