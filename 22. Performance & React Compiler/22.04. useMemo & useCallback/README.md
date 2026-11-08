# useMemo & useCallback

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the Framehouse movie search as completed in the previous lecture (MovieResults wrapped in memo, with the showYear prop).
- Completed/movie-search: the same project at the end of the lecture, with the ranking cached and the cards memoized (src/MovieResults.tsx: const ranked = useMemo(() => rankMovies(query, sort), [query, sort]); toggleSaved wrapped in useCallback with an empty dependency array; src/MovieCard.tsx: export const MovieCard = memo(function MovieCard(...))). Keep it for the next lecture.
- Demonstrations/Changing callback/movie-search: the intermediate version, with the ranking cached and the cards memoized while toggleSaved is still created again on every render (see its README). It uses the same port, so run one project at a time.
- Practice/C29 - Refresh a Memoized Filter: the coding exercise for this lecture (Instructions, Hints, the Starter and Solution projects, the solution explanation and the Native files; see its README).
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Run the profiling build (`npm run build:profile`, then `npm run preview`) and open http://localhost:5250. Click Open measurement panel, then Clear measurements and Close measurement panel, save a film with its plus button and reopen the panel: the MovieResults update row is now well under a millisecond, because the ranking is reused. Remove the film and compare again; the exact numbers vary by device. Do the same in the Changing callback demonstration to compare the intermediate step. Then search Garden, save two films and remove one: the results and the saved count stay correct.
