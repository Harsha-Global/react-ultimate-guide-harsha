# Profiling React Applications

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the supplied Framehouse movie search (a fictional 480-film catalogue with local data, posters and fonts, and a prepared measurement panel).
- Completed/movie-search: the same project at the end of the lecture, with the movie results measured by a Profiler (src/App.tsx: Profiler and recordRender imported; the MovieResults element wrapped in <Profiler id="MovieResults" onRender={recordRender}>). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Run the profiling build (`npm run build:profile`, then `npm run preview`) and open http://localhost:5250. Keep the search empty, Best match and Show release year selected, and try the note field once to warm up. Click Open measurement panel, then Clear measurements, and type Tea in Note for tonight: each keystroke adds a React render row for MovieResults (update), an Event to frame row and, where the browser reports it, a Long task row. Clear and repeat a few times with the search and sort unchanged; the exact numbers vary by device. Then search Paper (40 films), clear the search (480 films), and save and remove a film. Read src/MovieResults.tsx (rankMovies(query, sort) runs during every render) and src/movies.ts (the deliberately costly scoring).
