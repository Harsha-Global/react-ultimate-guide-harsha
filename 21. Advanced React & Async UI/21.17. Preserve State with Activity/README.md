# Preserve State with Activity

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the studio notice read from a promise).
- Completed/booking-studio: the same project at the end of the lecture, with the visit notes (src/VisitNotes.tsx: VisitNotes keeps a controlled draft and an effect that listens for the browser's online and offline events; VisitNotesPanel keeps the show state and its toggle button outside an Activity boundary whose mode is visible or hidden, so hiding the notes keeps the draft while the effect is cleaned up), rendered in src/App.tsx after the studio notice. Keep it for the next lecture.
- Supplied/Visit notes: the prepared notes component (VisitNotes.tsx, the conditional version) and the stylesheet with the notes styles (index.css), copied into src in the video.
- Demonstrations/Conditional removal: the separate example that removes the notes when they are hidden, so the draft is lost (see its README).
- Demonstrations/Effect lifecycle: the separate example whose interval stops while its draft is hidden and starts again when it is shown (see its README). The examples use the same port, so run one project at a time.
- Styles: the updated prepared stylesheet with the notes styles (already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Write a note, click Hide visit notes, then Show visit notes: the note is still there. Reload the page: the draft is empty (the notes are not stored). In the Conditional removal example the note is lost when the notes are hidden. In the Effect lifecycle example, Hide draft stops the callback counter and adds a cleanup event; Show draft brings back the same note, adds a setup event and the counter resumes (in development, StrictMode can add an extra setup and cleanup).
