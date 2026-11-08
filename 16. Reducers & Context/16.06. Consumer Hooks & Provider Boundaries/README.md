# Consumer Hooks & Provider Boundaries

The completed basket is the exact source demonstrated in the video. One BasketProvider owns the reducer. Separate nullable contexts provide state and dispatch; guarded consumer hooks centralize access.

- Starter/booking-basket: the incoming combined context.
- Completed/booking-basket: separate contexts and focused hooks used by all four consumers.
- Demonstrations/ProviderBoundaries: independent outer and inner providers, plus the missing-provider guard.
- Practice/ProviderPlacement/Starter: the provider sits below the component's context read.
- Practice/ProviderPlacement/Solution: App places the provider above TicketControl.
- Styles: the existing course stylesheet.

## Run an example

Open the desired app folder in VS Code. Run npm ci, then npm run dev, and open the address printed by Vite. Validate with npm run check, npm run lint and npm run build.

In the boundary demonstration, add once to Outer, then twice to Inner. Outer and Outer sibling show one ticket; Inner shows two. Toggle the consumer outside the providers to see the explicit guard message.

In the placement solution, Add a ticket changes zero to one. A reload returns to zero. The practice uses the component name TicketControl to match the narration.

A dispatch-only consumer does not subscribe to the changing state context value. This does not prevent renders caused by parents or the component's own state.
