# State Ownership

The completed application is the exact source demonstrated in the video.

- Starter/booking-basket: the incoming basket with separate state and dispatch contexts.
- Completed/booking-basket: the local contact draft and shareable category filter.
- Styles: the existing course stylesheet.

## Run

Open an application folder in VS Code. Run npm ci, then npm run dev and open the address Vite prints. Validate with npm run check, npm run lint and npm run build.

## Try the independent owners

Add Studio painting and enter alex@example.com in the contact draft. Select Food: the address changes, Supper club is the only visible catalog card, and Studio painting stays in the basket. Clear the basket: the email draft remains. Select Creative and press browser Back: Food returns.

Reload: the URL category remains, while the basket and email draft reset. Open /?category=Creative directly: Studio painting is the visible event. Expand Experience details: this affects only that disclosure.

The basket represents client choices. The catalog uses local fixtures; adding a ticket does not reserve seats or create a confirmed booking. A real server must confirm availability and reservation records.
