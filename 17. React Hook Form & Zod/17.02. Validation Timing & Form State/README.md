# Validation Timing & Form State

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the form already connected to React Hook Form.
- Completed/event-registration: validation timing, rules, accessible error messages, form-state indicators and a pending submission.
- Helpers/preview.ts: the supplied local preview helper. Copy it into the project's src folder.
- Styles: the prepared stylesheet.

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`.

## Try it

Reload, focus Full name and move to Email address: the name message appears and Name touched becomes true. Type a valid name and the error clears as the value changes. Clear it again: the field stays touched while Name dirty returns to false. Submit the empty form to reveal both messages. Enter Alex Morgan and a valid email address: the form is valid and dirty. Choose Review registration: for a moment the button shows "Preparing preview…" and is disabled while the inputs are read-only, then the preview appears.

The preview helper waits briefly to simulate asynchronous work. It does not call an API.