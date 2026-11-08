# Load the catalog

`product-explorer` contains the completed application. `Starter/product-explorer` contains the starting application for following the lesson.

The collection, bag and inventory read a checked product list through a shared route loader. The individual product page still reads local data at this checkpoint. Search and category filtering remain local. The bag stores product IDs and quantities separately from the loaded catalog.

From either application folder, run `npm ci`. Start the practice API with `npm run api` and leave that terminal running. In a second terminal run `npm run dev`, then open the printed local address. See Setup.md and Reference.md for the practice API and commands.

Check the application with `npm run check`, `npm run lint` and `npm run build`. Dependencies, generated builds, narration, recordings and production files are excluded.
