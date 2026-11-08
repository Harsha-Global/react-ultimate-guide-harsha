# Performance Verification

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the Framehouse movie search as completed in the previous lecture (the image-loading policy and the lazily loaded film details).
- Completed/movie-search: the same project at the end of the lecture, unchanged: this lecture measures and checks it rather than changing it. Keep it for the next lecture.
- Comparison/movie-search-original: the original example from the start of this section (the project before the performance changes), used for the comparison in the video. Copy it to C:\react\movie-search-original, run `npm ci`, `npm run build:profile` and `npm run preview`. It uses the same port as the final project, so run one preview at a time.
- Practice/A13: the note-update assignment (Assignment.md, Rubric.md, the Starter and Solution projects and the solution explanation; see its README).
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Build each project with `npm run build:profile`, then `npm run preview`, one at a time, on the same device, with the search empty, Best match and Show release year selected. Open the measurement panel and check the MovieResults mount row. Make one warm-up edit, then clear the measurements before each recorded edit: in the original example a note edit renders MovieResults again (an update row), in the final project only Event to frame rows appear. Repeat three runs for the note (Tea and a film, Tea and a quiet film, Tea and a short film), the Collection guide button and the saved-film button on Amber Story (close the panel while clicking, reopen it to read). Keep the React render and Event to frame values as separate observations. Then check the behavior: save two films and remove one, page forward and back, search Paper (two pages), choose Title A–Z (page 1), search a title with no matches and clear it, switch the release year off and on, open and close a film, and use Tab and Enter on the page controls. Finally run `npm run build` and `npm run preview`: the ordinary build records no React render rows; open a film and try a narrow window.
