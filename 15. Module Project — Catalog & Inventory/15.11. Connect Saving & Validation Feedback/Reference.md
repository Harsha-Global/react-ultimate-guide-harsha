# Connect Saving & Validation Feedback — references

**Goal:** Submit the editor, retain rejected drafts and show pending, field and successful-save feedback.

## Teaching sequence

- Finish the save experience
- Keep the draft after a rejected submission
- Connect submission, errors and pending feedback
- Save a correction and check invalid input

## Official API references

- [Form](https://reactrouter.com/api/components/Form)
- [useActionData](https://reactrouter.com/api/hooks/useActionData)
- [shouldRevalidate](https://reactrouter.com/api/route/shouldRevalidate)

## Checkpoint outcome

Form submission, action feedback, focus, pending state and successful confirmation are connected.

Use Code.md for the exact source and editing sequence. The full supplied service contract is in `API Contract.md`. Client route actions run in the browser and use existing backend endpoints. A request abort does not undo a server write. Keep browser shopper choices separate from current API records and local editor drafts.
