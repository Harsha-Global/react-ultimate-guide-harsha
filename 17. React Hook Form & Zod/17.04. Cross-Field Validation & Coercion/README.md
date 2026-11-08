# Cross-Field Validation & Coercion

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the Zod schema, inferred types and resolver from the previous lecture.
- Completed/event-registration: a ticket count parsed from text into a number (1 to 4), attendance and city with a rule across both fields, a required terms checkbox, the matching controls, and a city recheck when attendance changes. scripts/check-schema.ts now also prints the numeric output and Boolean("false").
- Styles: the prepared stylesheet.
- Practice/C19 - Conditional Validation: the coding exercise's local Starter and Solution (see its README).

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`. Run `npm run schema` to parse the example payloads.

## Try it

Enter a name and email address, accept the terms, leave the city empty and submit with In person selected: the message appears beside the City field. Choose Online and the message clears straight away; choose In person again and enter Denver. Try an empty ticket count, 1.5 and 5 to see each rule's message. Set the count to 2, clear the checkbox and submit to see the terms message, then accept the terms and submit: the preview shows the parsed number of tickets and the attendance choice.

The preview helper waits briefly to simulate asynchronous work. It does not call an API.