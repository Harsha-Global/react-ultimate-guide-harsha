# Solution and reasoning

App imports Activity, owns only the visibility flag and keeps BookingForm in the same Activity subtree. Hidden mode preserves the form’s local state while hiding its controls. The toggle stays outside that subtree. Showing the form does not create a replacement instance. The existing name and email owners remain in BookingForm; no synchronization effect is needed.

Activity is useful when returning to the same temporary view should preserve its state. If the requirement is to discard the draft and start over, unmounting or an intentional reset can be appropriate. This task preserves in-memory state, not a draft across page reloads.

## Checks

- Enter Maya and maya@example.com. Hide the form, then show it. Both values must remain.
- While hidden, the booking inputs must not appear in the normal Tab sequence. The show button must remain usable.
- After showing the form, use the keyboard to reach its controls and edit a retained value.
- Change the session with the form hidden, then show it. Keep the contact draft and display the current session.
- Check the existing session-details dialog, visit notes and reviews. Build and lint the solution.
