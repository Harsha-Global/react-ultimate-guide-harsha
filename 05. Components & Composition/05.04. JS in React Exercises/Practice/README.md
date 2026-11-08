# Practice - Props and Lists (TypeScript companion)

The Props and Lists coding exercise runs in Udemy's editor, in JavaScript with JSX: use its supplied `App.js`,
Run tests, read the named feedback, try the hints before the solution. These two folders are its TypeScript
companion, for reference. They keep the typed prop contract (`Product`, `ProductCardProps`, `ProductListProps`);
a second attempt in VS Code isn't required.

- `starter` - the exercise's starting point with the prop and data types.
- `solution` - the complete typed solution: `ProductCard` renders the name in an `h2` and `Price: $<price>`,
  `ProductList` returns `No products available.` for an empty array and otherwise a `ul` whose `li` items use each
  product's stable `id` as the key. `Solution Explained.md` explains it.

## Run and compare

Copy this Practice folder to a separate working location such as `C:\react\practice-js-in-react`. Open `starter`
or `solution` in VS Code. In its Command Prompt terminal, run `npm ci` once and `npm run dev`; use the address Vite
prints. `npm run check` runs TypeScript, `npm run build` checks the types and builds. Stop a server with Ctrl+C
before switching folders. Keep the course's main `movie-discovery` project unchanged.
