# A12 — Preserve a Booking Draft

Keep the booking draft while its form is temporarily hidden.

## Client request

The starter includes a Hide booking form button. It conditionally removes the form, so showing it again loses its local name and email. The client wants to put the form aside briefly without losing that draft.

## Your work

Use the Activity component to control visibility. Keep the form at a stable place in the tree and retain its existing state owner. Keep the toggle outside the hidden content. Do not use local storage, a second copy of the form state, a new key or a page reload to simulate preservation.

## Start and check

npm run api (first terminal), npm run dev (second terminal). Open http://127.0.0.1:5210. The API is on port 4318. Stop previous studio servers first.

1. Enter Maya and maya@example.com. Hide the form, then show it. Both values must remain.
2. While hidden, the booking inputs must not appear in the normal Tab sequence. The show button must remain usable.
3. After showing the form, use the keyboard to reach its controls and edit a retained value.
4. Change the session with the form hidden, then show it. Keep the contact draft and display the current session.
5. Check the existing session-details dialog, visit notes and reviews. Build and lint the solution.

## Submit your explanation

1. What did you change?
2. Which checks did you run, and what did you observe?
3. Why does your chosen state owner or validation boundary fit this requirement?

Use the course source-code route in How to Download Source Code. The starter and full separate solution belong to this lecture’s Practice/A12 folder. Attempt and test your work before opening Solution. This is a manually reviewed assignment, not an automatic grader or an extra recorded solution lecture.
