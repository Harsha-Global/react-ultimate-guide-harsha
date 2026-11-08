type Draft = { name: string; email: string };
type SaveState = { draft: Draft; reference: string | null; message: string };
type Sender = (draft: Draft) => Promise<{ reference: string }>;
async function saveDraft(draft: Draft, send: Sender): Promise<SaveState> {
  // TODO: keep a failed draft and clear only after the request succeeds.
  return { draft: { name: "", email: "" }, reference: null, message: "" };
}
