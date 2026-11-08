# ViewTransition Animations

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the visit notes kept by Activity).
- Completed/booking-studio: the same project at the end of the lecture, with a small notes transition (src/VisitNotes.tsx: the toggle schedules its show change with startTransition, and a ViewTransition boundary inside Activity, around the notes container, enables only the enter and exit animations with the notes-panel class) and the motion styles in src/index.css (a 220 ms fade and slide in, a 180 ms fade out, no root snapshot, and no animation when reduced motion is preferred). Keep it for the next lecture.
- Demonstrations/Animation inspection: the separate example with the same notes animation slowed to 1400 ms for inspection only (see its README). It uses the same port, so run one project at a time.
- Styles: the updated prepared stylesheet with the motion styles (already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Write a note, click Hide visit notes, then Show visit notes: the notes fade out and back in with the draft kept. Activate the button with the keyboard (Space or Enter) and toggle it quickly a few times: the label always matches the panel. In the Animation inspection example the same change is slow enough to watch. With reduced motion enabled (your system setting, or the Rendering tools in Chrome DevTools: Emulate CSS media feature prefers-reduced-motion), the notes still show and hide with the draft kept, without the fade or slide.
