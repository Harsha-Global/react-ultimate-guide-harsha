# Generic Component APIs

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio-typed: the project as completed in the previous lecture (GroupDetails in edit and review modes), with an empty src/bookingChoices.ts that this lecture fills in.
- Completed/booking-studio-typed: the same project at the end of the lecture: src/bookingChoices.ts holds the session choices (Morning and Evening with their times) and the group templates (Two friends, Four friends); src/OptionPicker.tsx is a generic picker (T extends { id: string }: readonly options, selectedId, getLabel, onSelect and an accessible label) that renders a button with aria-pressed per option; src/App.tsx uses it for the workshop session, and src/TypedBooking.tsx for the starting group size, which replaces the attendee rows with blank names. Keep it for the next lecture.
- Demonstrations/Before Generic: the two concrete pickers compared in the video (SessionPicker.tsx, TemplatePicker.tsx) and booking-studio, a complete copy of the project that uses them (see its README). Copy it to its own folder (for example C:\react\booking-studio-typed-before-generic); it uses the same ports, so run one project at a time.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy booking-studio-typed into your React workspace (for example C:\react\booking-studio-typed, separate from the earlier booking-studio project) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4318; `npm run api:slow` delays its responses so the pending states stay visible). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5210. The local API keeps its sample bookings in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Change the session with the Morning and Evening buttons: the pressed button, the time and the session summary follow it. Choose A group, then Four friends: four attendee name fields appear; Two friends returns to two (choosing a size again replaces the entered names). Both pickers are src/OptionPicker.tsx: hover over getLabel and onSelect in src/App.tsx and src/TypedBooking.tsx to see the record type each caller receives. Compare SessionPicker.tsx and TemplatePicker.tsx in Demonstrations/Before Generic.
