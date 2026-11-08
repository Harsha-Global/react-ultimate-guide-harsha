# Async Defaults & Reset

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the registration form from the previous lecture (the SessionPicker connected through a Controller).
- Completed/event-registration: an attendee editor. App keeps the chosen attendee and a retry count, renders an attendee select and gives the form a key per record and attempt. The form loads its default values asynchronously through getAttendee (one request per form instance), shows a loading message, shows an error panel with a retry button when loading fails, and its reset button restores the loaded record. The practice API lives in server/.
- Supplied API/server: the practice API folder copied into the project root in the video.
- Dependencies: the package file and lock file copied into the project root (they add the api and reset scripts).
- Helpers/attendees.ts: the typed request helper copied into src.
- Styles: the prepared stylesheet.
- Practice/L05 Schema Validation: the optional lab (Brief, Hints, Starter, Solution).

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4087 and check http://localhost:4087/api/health. In a second terminal run `npm run dev` and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real reservation or payment.

## Try it

Alex Morgan loads with Jordan Lee as a guest and the Morning session. Change the name, remove the guest and choose Afternoon, then click Reset to loaded details: the loaded values return together. Choose Casey Park: online attendance, the Afternoon session and no guests load, and reset returns Casey's details. Stop the API and choose another attendee: the error panel appears instead of an editable blank form. Start the API again and click Try loading again.