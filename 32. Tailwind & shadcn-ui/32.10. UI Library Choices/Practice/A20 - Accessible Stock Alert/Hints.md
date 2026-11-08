# Hints

1. Follow the existing Stock field: register once with valueAsNumber, use the supplied default, and connect the label, help and error IDs.
2. Empty numeric input is not zero. Let the schema reject it. Keep the input read-only during a pending request.
3. Low stock means stock>0 AND stock<=reorderLevel. Zero stock remains Unavailable. Use the shared helper in the card, dialog and catalog count.
4. The supplied onSaved callback already replaces the matching item with the accepted API product. Do not update the list from an unaccepted draft.
5. Keep server and connection-error feedback, keyboard focus, theme and responsive behavior. Attempt before opening Solution/admin-workspace.
