# React Hook Form Setup

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the familiar controlled registration form. React Hook Form is already in the supplied dependencies.
- Completed/event-registration: the same form connected to React Hook Form with useForm, register and handleSubmit.
- Styles: the prepared stylesheet. Copy index.css to src/index.css if you need to restore the appearance.

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`.

## Try it

Enter Alex Morgan and alex@example.com, then choose Review registration: the local preview shows the submitted details. Change the name without submitting and the preview keeps the last submitted name until you submit again; the Enter key also submits. An empty name can still reach the preview because no required rule has been added yet, while the browser's email control still checks the shape of a nonempty address.

This stage only updates a local preview. No reservation request is sent.