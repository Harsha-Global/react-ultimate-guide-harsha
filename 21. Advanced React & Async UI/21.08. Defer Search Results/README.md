# Defer Search Results

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the review tabs).
- Completed/booking-studio: the same project at the end of the lecture, with the workshop search (src/WorkshopSearch.tsx: the input uses the current query, the memoized results use the deferred query, and an updating message shows while the results are behind) before the reviews panel. Keep it for the next lecture.
- Supplied/WorkshopSearch prepared code.tsx: the prepared workshop names and SearchResults component, pasted into src/WorkshopSearch.tsx after its import in the video.
- Demonstrations/Slow results: the same project with deliberately slow result rows, so the deferred results are easier to observe (see its README). It uses the same port, so stop the main project's server before running it.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open http://localhost:5210. Validate with `npm run lint` and `npm run build`.

## Try it

Search for glaze: Glaze Lab appears. Type text that matches nothing: "No workshops match that search." appears; clear the field to show all eight workshops. In the Slow results example, type quickly: the input shows each letter at once while the list catches up behind "Updating the results…".
