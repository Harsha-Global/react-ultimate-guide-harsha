type PreviewState = { requestId: string | null; status: "idle" | "pending" | "ready"; message: string };
type Completion = { requestId: string; message: string };
function completePreview(state: PreviewState, completion: Completion): PreviewState {
  // BUG: an obsolete response can replace the latest pending request.
  return { requestId: null, status: "ready", message: completion.message };
}
