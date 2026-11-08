# Willow House booking studio — reopenable confirmations

Copy the completed project to C:\react\booking-studio-typed. Use the pinned lock file: npm ci. In one terminal run npm run api. Check http://127.0.0.1:4318/api/health for status ready. In another terminal run npm run dev; open http://localhost:5210. The Vite proxy sends /api requests to the separate API server. The fictional API collects no payment and persists only in memory.

POST /api/bookings accepts requestId,name,email,slot. Success201 (or200 for the same accepted request) returns reference,name,slot.409 means full session or reusing an accepted requestId with different details;422 means invalid input. Evening starts full; Morning starts with five places. A repeated identical accepted request returns the same reference without consuming another place. Reloading creates a new form/request identity. Disable-after-success prevents accidental repeat submission in the current form; this is not a substitute for server validation.

For observable pending UI, stop the API with Ctrl+C and run npm run api:slow instead. This explicit demonstration mode delays booking responses; main mode has no artificial delay. Only one API process should run at a time. Restarting the server resets its in-memory data. When restoring practice data, PowerShell: Invoke-RestMethod -Method Post -Uri http://127.0.0.1:4318/api/reset . Reset first, then reload the page so the form receives a fresh requestId. This endpoint is for the local course fixture, not a deployment API.

Check: Evening→full alert with fields preserved; Morning→confirmation; API stopped→uncertain-result message; restart API→retry same details; browser required/email validation; slow mode disables controls. Do not use real personal details. Test names/emails such as Avery Stone/avery@example.com are sufficient. Run npm run lint and npm run build.

## Reviews

Use GET /api/reviews to load the authoritative list. POST /api/reviews accepts clientId,name,text and returns one saved record with id/clientId/name/text (201 new,200 identical replay). The server trims accepted fields, rejects links with422, and rejects a reused accepted clientId with different content with409. Initial records are Maya and Sam. Names need2–80 characters; review text10–500. The request helper validates runtime responses. The client keeps the same identifier for an unchanged retry; success clears the review text urgently and keeps the name. Saved list reconciliation is a transition. The preview reducer is pure and deduplicates a saved clientId. Only one submission per mounted form at a time; no offline/background outbox or multi-writer ordering guarantee.

Select Reviews, enter a name and a review. Use slow API mode to see Sending before acceptance. Try a review containing https://example.com to see the server rejection, automatic preview removal and retained draft. Remove the link and retry. Reload/select Reviews to confirm saved data. Stopping the API removes all in-memory records; POST /api/reset restores seeds and booking capacity.

## Context and a stable promise

The optional session reminder reads BookingContext with the use API only when shown. The public studio notice uses GET /api/studio-notice, which returns a message object. The request helper validates that response and caches its Promise for this page. Ordinary re-renders reuse it. Refresh notice explicitly invalidates it and resets the boundary; the API's slow mode delays the notice by 1600 ms for observation. A rejected Promise goes to the local ErrorBoundary. Start/restart the API and choose Try notice again to recover. This teaching-sized cache does not add stale times, user scoping or automatic invalidation.

The existing bookings/reviews remain separate. Promise reading does not turn effect-based fetching into Suspense automatically or undo API changes. Current stable API reference: https://react.dev/reference/react/use

## Preserving visit notes with Activity

Write a note, hide the notes, then show them. The Activity boundary preserves the controlled draft and DOM while hidden; the connection effect removes its online/offline listeners and runs setup again on reveal. Reopening samples the current browser status before re-subscribing. navigator.onLine is a browser hint, not a server-health check. Notes are not persisted to storage: reloading clears them. The toggle stays outside the Activity boundary, with aria-expanded and aria-controls. No new API endpoint is required.

In the Preserve State with Activity lecture folder, `Demonstrations/Conditional removal/booking-studio` is an independent earlier behavior: the draft resets when its component is removed. The `Demonstrations/Effect lifecycle/booking-studio` folder in that same lecture is an isolated timer instrument, not a production clock or performance benchmark. Its visible tick count stops while hidden and resumes after reveal; the list shows effect setup/cleanup, including the extra development StrictMode cycle. See https://react.dev/reference/react/Activity .

## A bounded notes animation

The notes toggle schedules its show-state change with startTransition. An explicit ViewTransition is placed directly inside Activity, before its DOM container. It enables only enter/exit with the notes-panel view-transition class; React generates its unique name. Root snapshot animation is disabled. CSS gives the entering note a small6px fade/slide and the exiting note a brief fade. The reduced-motion media query disables these pseudo-element animations. Controlled typing remains an ordinary urgent update. React coordinates the browser view transition; this app does not call document.startViewTransition directly. A browser without native support should retain the show/hide behavior; animation is optional.

Check hide/show, retained draft, rapid changes and keyboard activation. Test the operating system's reduced-motion setting in the target recording browser: state changes must still work without the animation. The independent `Demonstrations/Animation inspection/booking-studio` copy in the ViewTransition Animations lecture folder slows the same custom keyframes for observation only; it is not the main app's timing. https://react.dev/reference/react/ViewTransition

## Fragment refs for the guest fields

The explicit Fragment groups NameField and the email field without inserting a DOM wrapper. detailsRef holds a FragmentInstance: focus() finds the first focusable descendant (Guest name here), and focusLast() finds the last (Email address here). The two toolbar buttons stay outside that group. The name component's optional imperative handle remains available to its other consumers; this form no longer needs a per-name ref. Fragment refs are not HTMLElement refs and the shorthand empty tags cannot receive a ref. The current React/DOM types supply the renderer-specific FragmentInstance methods.

Check both focus buttons and normal Tab navigation, preserving typed values. During submission or after confirmation, the toolbar and fields stay disabled as before. Inspect the form DOM: the two field divs are direct children of the form, without a Fragment element or added wrapper. No new endpoint or behavior of the booking action is introduced. https://react.dev/reference/react/Fragment

## Typed bookings

Who is coming? chooses Just me (one place) or A group (a group name and attendee rows, edited in GroupDetails and shown again in its review mode, which takes no change handler). The session buttons and the group starting sizes (Two friends, Four friends) share the generic OptionPicker; choosing a size again replaces the attendee names. Add attendee and Remove attendee go through a typed reducer (src/bookingReducer.ts) that keeps a group between two and eight people; its assertNever default reports an unhandled action at compile time. The request helper (src/typedBookingApi.ts) checks a booking with the shared schema (shared/bookingSchema.ts), sends it to the typed-booking service and parses the saved confirmation; Service Contract.md describes the service. Book this visit submits either kind; a rejected request keeps the entered details, and the booking choices are locked while saving and after confirmation. Open this confirmation reopens a saved booking from its link (?booking= followed by its reference); an invalid or unknown reference shows its own message.
