# Zod Schemas & Type Inference

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the form with its validation timing and form-state indicators (input tags written on one line each).
- Completed/event-registration: a Zod registration schema, inferred input and output types, the Zod resolver connected to React Hook Form, and a boundary check script.
- Dependencies: the supplied package.json and package-lock.json that add Zod and the resolver package. Copy both into the project's root folder.
- Helpers/check-schema.ts: the boundary demonstration. Copy it into a scripts folder at the project's root.
- Styles: the prepared stylesheet.

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run dev`, and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`. Run `npm run schema` to parse the valid and invalid example payloads.

## Try it

Enter spaces around the name, such as "  Alex Morgan  ", and an email address in capital letters. Submit: the preview shows the trimmed name and the lowercase address, while the input controls keep the text as typed. Enter an invalid email address and submit again to see its message beside the Email address field.

The preview helper waits briefly to simulate asynchronous work. It does not call an API, and the check script is not an HTTP server.