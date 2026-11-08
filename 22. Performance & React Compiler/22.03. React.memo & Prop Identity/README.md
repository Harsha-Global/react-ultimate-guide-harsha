# React.memo & Prop Identity

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the Framehouse movie search as completed in the previous lecture (NoteEditor and the DiscoveryFrame spacing wrapper).
- Completed/movie-search: the same project at the end of the lecture, with MovieResults wrapped in memo and a simpler prop (src/MovieResults.tsx: export const MovieResults = memo(function MovieResults(...)); a showYear boolean in place of the displayOptions object, passed to each MovieCard; src/App.tsx passes showYear={showYear}). Keep it for the next lecture.
- Demonstrations/Changing object prop/movie-search: the intermediate version, with MovieResults wrapped in memo while App still passes a new displayOptions object on every render (see its README). It uses the same port, so run one project at a time.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Run the profiling build (`npm run build:profile`, then `npm run preview`) and open http://localhost:5250. Click Open measurement panel, Clear measurements and Close measurement panel, click Collection guide, then reopen the panel: the MovieResults update row reads about 0.0 ms, because React skipped the memoized results. Do the same in the Changing object prop demonstration: the update still takes its full time, because the new displayOptions object counts as a changed prop. Back in the Completed project, search Paper (40 films), clear Show release year (the years disappear from the cards) and select it again, and save a film with its plus button (1 saved): these real changes still update the results.
