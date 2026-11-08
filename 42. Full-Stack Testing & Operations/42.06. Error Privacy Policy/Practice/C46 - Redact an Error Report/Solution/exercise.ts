type ErrorDraft = Readonly<{ message: string; filename?: string; line?: number; user?: unknown; request?: unknown; extra?: unknown }>;
type SafeError = { message: string; filename?: string; line?: number };
function redactError(draft: ErrorDraft): SafeError {
  const safe: SafeError = { message: draft.message === 'ShopFront controlled telemetry check' ? draft.message : 'Application error' };
  const filename = draft.filename?.split(/[?#]/)[0].split(/[\\/]/).pop();
  if (filename) safe.filename = filename;
  if (typeof draft.line === 'number' && Number.isSafeInteger(draft.line) && draft.line > 0) safe.line = draft.line;
  return safe;
}

