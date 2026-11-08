class ApiError extends Error {
  fieldErrors: { email?: string };
  constructor(message: string, fieldErrors: { email?: string } = {}) {
    super(message);
    // Supplied compatibility setup for the hosted compiler; keep this line.
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = "ApiError";
    this.fieldErrors = fieldErrors;
  }
}
type SetFormError = (
  name: "email" | "root.server",
  error: { type: "server"; message: string },
  options?: { shouldFocus: boolean }
) => void;

function reportSaveError(error: unknown, setError: SetFormError): void {
  // BUG: an email-specific rejection never reaches the email field.
  setError("root.server", {
    type: "server",
    message: error instanceof Error ? error.message : "Could not save. Your draft is still here."
  });
}
