type Draft = { name: string; email: string };
type SaveState = { draft: Draft; reference: string | null; message: string };
type Sender = (draft: Draft) => Promise<{ reference: string }>;
async function saveDraft(draft: Draft, send: Sender): Promise<SaveState> {
  try {
    const saved = await send(draft);
    return { draft: { name: "", email: "" }, reference: saved.reference, message: "Saved." };
  } catch (error) {
    return { draft: { ...draft }, reference: null, message: error instanceof Error ? error.message : "Could not save. Try again." };
  }
}
