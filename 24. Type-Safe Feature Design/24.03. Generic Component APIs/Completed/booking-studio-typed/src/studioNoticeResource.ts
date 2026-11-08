let cachedPromise: Promise<string> | undefined;

async function fetchStudioNotice(): Promise<string> {
  const response = await fetch("/api/studio-notice");
  if (!response.ok) throw new Error("The studio notice is unavailable.");
  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== "object" ||
    !("message" in data) ||
    typeof data.message !== "string" ||
    !data.message.trim()
  ) {
    throw new Error("The studio notice has an unexpected shape.");
  }
  return data.message;
}

// One public notice, cached for this page. This is a teaching-sized resource,
// not a replacement for a framework or a general server-state cache.
export function getStudioNotice(): Promise<string> {
  cachedPromise ??= fetchStudioNotice();
  return cachedPromise;
}

export function invalidateStudioNotice() {
  cachedPromise = undefined;
}
