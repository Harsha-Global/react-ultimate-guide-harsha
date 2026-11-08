# React Compiler

The completed application is the exact source demonstrated in the video.

- Starter/movie-search: the Framehouse movie search as completed in the previous lecture (the ranking cached with useMemo, toggleSaved with useCallback, MovieResults and MovieCard wrapped in memo).
- Completed/movie-search: the same project at the end of the lecture, with the React Compiler in the build (vite.config.ts: reactCompilerPreset in a babel step after react(), with a logger that prints each compile event and the reason for a CompileError) and the manual caches it makes unnecessary removed (MovieResults and MovieCard without memo, toggleSaved an ordinary function); the ranking stays cached with useMemo. Keep it for the next lecture.
- Demonstrations/Automatic only/movie-search: the comparison copy made in the video, with the compiler and no manual caches (the direct ranking call; see its README).
- Demonstrations/Compiler opt-out/movie-search: the automatic-only version with a temporary "use no memo" directive in MovieResults (see its README).
- Compiled code/MovieResults compiled.txt: the recorded compiler output for the automatic-only MovieResults, with the condition that also checks savedIds.
- The projects use the same port, so run one project at a time.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts and the original poster art in public/posters.

## Run

Copy movie-search into your React workspace (for example C:\react\movie-search) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5250. For comparable React timings, stop the development server, run `npm run build:profile`, then `npm run preview` (the same address). `npm run build` followed by `npm run preview` is the ordinary production build, without React's timing rows. Validate with `npm run lint` and `npm run build`.

## Try it

Run the profiling build (`npm run build:profile`, then `npm run preview`) and open http://localhost:5250: the terminal shows a [React Compiler] CompileSuccess line for each of the seven components. Click Open measurement panel, Clear measurements and Close measurement panel, save a film and reopen the panel: the MovieResults update stays around a millisecond, because useMemo still reuses the ranking. Do the same in Demonstrations/Automatic only: the update takes its full time again, because the generated group of the compiler also depends on savedIds (see Compiled code/MovieResults compiled.txt). In Demonstrations/Compiler opt-out the build prints CompileSkip for MovieResults.tsx, and saving a film repeats the ranking. Back in the Completed project, save two films and remove one, search Paper (40 films), choose Title A–Z and clear Show release year.
