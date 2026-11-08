# Nested Fields & Field Arrays

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the registration form from the previous lecture (ticket count, attendance, city rule and terms).
- Completed/event-registration: the city moved into a nested contact object (schema, defaults, registration name, error lookup and the attendance recheck), a guests array schema (1 to 3 guests, each with a name of at least two characters), and useFieldArray rows keyed by their generated id with add and remove buttons. scripts/check-schema.ts uses the nested contact object and an empty guests array.
- Styles: the prepared stylesheet.

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`. Run `npm run schema` to parse the example payloads.

## Try it

Enter a name, email address, 2 tickets, In person with Denver and accept the terms. Add two guests, Jordan Lee and Casey Park, then remove the first guest: Casey Park stays in the remaining row, now labelled Guest 1. Add another guest, leave it empty and submit: the message appears beside that empty input. Remove the empty row and submit again: the preview lists Casey Park only. Add guests until the Add guest button is disabled at three. Clear the city with In person selected to see the city message beside the City field.

The preview helper waits briefly to simulate asynchronous work. It does not call an API.