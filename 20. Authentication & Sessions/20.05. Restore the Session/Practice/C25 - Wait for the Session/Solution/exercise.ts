type AuthState =
  | { status: "checking" }
  | { status: "authenticated"; user: { id: string; name: string } }
  | { status: "anonymous"; message?: string }
  | { status: "error"; message: string };
type SessionScreen = "checking" | "retry" | "account" | "login";

function selectSessionScreen(state: AuthState): SessionScreen {
  if (state.status === "checking") return "checking";
  if (state.status === "error") return "retry";
  if (state.status === "authenticated") return "account";
  return "login";
}
