# Controller & Custom Fields

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the registration form from the previous lecture (nested contact city and the guests field array).
- Completed/event-registration: a session enum ("morning" or "afternoon") with a morning default, a reusable SessionPicker component with its own prop contract (value, onValueChange, onBlur, name, inputRef, disabled) rendering accessible radio cards, and a Controller that adapts the form's field object to those props. The local preview shows the submitted session. scripts/check-schema.ts includes the session.
- Styles: the prepared stylesheet.

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`. Run `npm run schema` to parse the example payloads.

## Try it

The Morning option is selected at the start. Fill in a valid registration, choose Afternoon and submit: the preview shows the afternoon session. Focus the session group and use the arrow keys to move between the options. While the preview is being prepared, both options are unavailable. The guest rows and the city message behave as before.

The preview helper waits briefly to simulate asynchronous work. It does not call an API.