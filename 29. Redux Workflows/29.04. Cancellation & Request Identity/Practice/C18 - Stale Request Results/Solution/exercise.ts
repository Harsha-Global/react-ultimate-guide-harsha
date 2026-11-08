type PreviewState = { requestId: string | null; status: "idle" | "pending" | "ready"; message: string };
type Completion = { requestId: string; message: string };
function completePreview(state: PreviewState, completion: Completion): PreviewState {
  if (state.status !== "pending" || state.requestId !== completion.requestId) return state;
  return { requestId: null, status: "ready", message: completion.message };
}
