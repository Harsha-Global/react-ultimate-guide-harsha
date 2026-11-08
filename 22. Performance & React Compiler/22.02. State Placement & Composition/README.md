# State Placement & Composition

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the Framehouse movie search as completed in the previous lecture (the movie results measured by a Profiler).
- Completed/movie-search: the same project at the end of the lecture, with the note in its own component (src/NoteEditor.tsx owns the note state and the evening-note section; App.tsx renders <NoteEditor />) and a spacing wrapper (src/DiscoveryFrame.tsx owns the compact setting and receives the profiled results through its children prop; App.tsx wraps the Profiler in it). Keep it for the next lecture.
- Styles: the updated prepared stylesheet with the compact-spacing rules (.view-controls, .discovery-frame.compact), already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter. The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Run the profiling build (`npm run build:profile`, then `npm run preview`) and open http://localhost:5250. Click Open measurement panel, then Clear measurements, and edit Note for tonight: only Event to frame rows appear, with no MovieResults render row. Save a film: a MovieResults update row appears, because the saved films belong to MovieResults. Click Compact card spacing: the gaps between the cards tighten, the panel records only Event to frame rows, and the note and the saved film stay as they were; click it again for the normal spacing. Search Garden: the results still update (12 films), because the search belongs to App.
