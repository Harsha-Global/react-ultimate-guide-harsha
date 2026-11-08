type AuthState =
  | { status: "checking" }
  | { status: "authenticated"; user: { id: string; name: string } }
  | { status: "anonymous"; message?: string }
  | { status: "error"; message: string };
type SessionScreen = "checking" | "retry" | "account" | "login";

function selectSessionScreen(state: AuthState): SessionScreen {
  // BUG: checking and failed requests are treated as confirmed sign-out.
  return state.status === "authenticated" ? "account" : "login";
}
