# Image & Feature Loading

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the Framehouse movie search as completed in the previous lecture (the results shown one page of 24 films at a time).
- Completed/movie-search: the same project at the end of the lecture, with a deliberate image-loading policy and a lazily loaded details feature (src/MovieCard.tsx: width={300} height={400} and loading={eager ? "eager" : "lazy"} on each poster image, with an eager prop; src/MovieResults.tsx: eager={index < 5}; src/MovieDetails.tsx: a default export; src/App.tsx: MovieDetails loaded with lazy(() => import("./MovieDetails")) inside a Suspense boundary with a loading message, wrapped in the supplied ErrorBoundary with a Reload page fallback). Keep it for the next lecture.
- Supplied/Error boundary/ErrorBoundary.tsx: the supplied error boundary, already copied into src in the Completed project; copy it into src when you start from the Starter.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Run the production build (`npm run build`, then `npm run preview`) and open http://localhost:5250: the build output lists a separate MovieDetails file in dist/assets. Reload the page and open a film: its details load from that file (the Loading film details message may show only briefly on a fast local server). Scroll down the page: each poster keeps its space while the images load; the first five load eagerly and the rest lazily, when the browser decides. Open a film, close its details and open another, and use Tab and Enter on a poster as well. The posters reuse 12 small SVG files, so this example does not show a large saving: measure the real requests before keeping a split.
