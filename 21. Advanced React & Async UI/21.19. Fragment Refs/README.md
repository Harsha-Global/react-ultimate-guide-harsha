# Fragment Refs

The completed application is the exact source demonstrated in the video.

- Starter/booking-studio: the Willow House booking studio as completed in the previous lecture (the small notes transition).
- Completed/booking-studio: the same project at the end of the lecture, with the guest details focus group (src/BookingForm.tsx: a Fragment with a ref groups the NameField and the email field without adding a wrapper element; detailsRef holds its FragmentInstance, and the toolbar row's Edit guest details and Edit email address buttons call its focus and focusLast methods; this form no longer uses NameField's own focus handle). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css). The licensed local fonts are in public/fonts.

## Run

Copy booking-studio into your React workspace (for example C:\react\booking-studio) and open it in VS Code. In its terminal run `npm ci`, then `npm run api`; in a second terminal run `npm run dev` and open http://localhost:5210 (the supplied proxy forwards /api requests to the local service on port 4318). Restarting the service resets its in-memory data. Use only made-up practice details. Validate with `npm run lint` and `npm run build`.

## Try it

Enter a guest name and an email address. Click Edit guest details: the Guest name field receives focus. Click Edit email address: the Email address field receives focus, and both values are kept. Click the text above the form and press Tab: focus moves through both buttons, both fields and Book this session in order. In Chrome DevTools (right-click the email field, Inspect), the form's children are the hidden input, the toolbar row, the two field containers and the submit button, with no wrapper element for the Fragment.
