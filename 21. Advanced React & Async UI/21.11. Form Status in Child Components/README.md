# Form Status in Child Components

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the booking request sent through the form Action).
- Completed/booking-studio: the same project at the end of the lecture, with the submit controls moved into a child component (src/BookingSubmit.tsx: useFormStatus reads the parent form's pending state and the submitted session, the button label and disabled state, and the waiting message naming the submitted session), rendered inside the form in src/BookingForm.tsx with the completed flag. Keep it for the next lecture.
- Demonstrations/Incorrect same component: the separate example whose status hook runs in the component that returns the form, so the button never shows the pending state (see its README).
- Demonstrations/Correct parent form: the separate example whose button component is rendered inside the form, so it shows Saving… while the submission is pending (see its README). Both examples use the same port and need no service, so stop the main project's server and run one at a time.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Stop the service and run `npm run api:slow`. Choose Evening, enter a name and an email address and click Book this session: the button reads "Saving your place…" and the waiting message names the evening session. While it is pending, choose Morning above the form: the message still names the evening session that was submitted. After "That session is full." appears, book again: the message names the morning session and the booking is confirmed. In the Incorrect same component example, Try submission keeps its label during the delay; in the Correct parent form example, it changes to "Saving…".
