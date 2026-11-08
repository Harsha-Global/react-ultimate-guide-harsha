# Paginate Movie Results

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the Framehouse movie search as completed in the previous lecture (the React Compiler in the build, the ranking cached with useMemo).
- Completed/movie-search: the same project at the end of the lecture, with the results shown one page of 24 films at a time (src/App.tsx: the page state, reset to 1 by the search and sort handlers and passed to MovieResults with its setter; src/MovieResults.tsx: PAGE_SIZE, pageCount, start and visibleMovies, and a pagination region with its range, Previous page and Next page buttons that only appears when there are films). Keep it for the next lecture.
- Practice/C30 - Page the Results: the coding exercise for this lecture (Instructions, Hints, the Starter and Solution projects, the solution explanation and the Native files; see its README).
- Styles: the updated prepared stylesheet with the pagination rules (.pagination), already in the Completed project's src/index.css; copy Styles/index.css over src/index.css when you start from the Starter. The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Run the profiling build (`npm run build:profile`, then `npm run preview`) and open http://localhost:5250: the results show Showing 1–24 of 480 and Page 1 of 20. Search Paper (Page 1 of 2) and choose Next page: Showing 25–40 of 40, with Next page disabled. Save a film, go to the other page and back: it stays saved. Clear the search, move to a later page and choose Title A–Z: the new order starts on page 1. Search a title with no matches: the page controls disappear beside the empty-result message. Use Tab and Enter on the page buttons as well.
