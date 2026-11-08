type ErrorDraft = Readonly<{ message: string; filename?: string; line?: number; user?: unknown; request?: unknown; extra?: unknown }>;
type SafeError = { message: string; filename?: string; line?: number };
function redactError(draft: ErrorDraft): SafeError {
  // TODO: explicitly select safe fields and normalize the filename.
  return { ...draft };
}

