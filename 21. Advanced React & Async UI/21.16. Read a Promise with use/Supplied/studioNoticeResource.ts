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
