# Context Types & Providers

The completed app contains the exact source demonstrated in the video. BasketProvider owns one reducer state and supplies its state and dispatch function through a typed, nullable context.

- Starter/booking-basket: the incoming composition layout with state owned by App.
- Completed/booking-basket: the demonstrated provider and four context consumers.
- Styles: the existing course stylesheet.

## Run the app

Open either app folder in VS Code. Run npm ci, then npm run dev, and open the local address printed by Vite. Validate with npm run check, npm run lint and npm run build.

Add Studio painting twice: the header shows two tickets and the summary shows $70. Change the quantity to four: the basket, header and total update together to four tickets and $140. Remove and clear use the existing reducer actions. A full reload returns to an empty basket because this provider keeps state in memory.

Every consumer checks for a missing provider. The catalog retains its optional visibleEvents prop; the layout shell continues to receive configured elements without owning basket rules.
