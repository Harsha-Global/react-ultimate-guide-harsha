import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "../shared/authSchema";
import { getSession } from "./api";
import { privateKeys, queryClient } from "./queryClient";
export type AuthState =
  | { status: "checking" }
  | { status: "authenticated"; user: User }
  | { status: "anonymous"; message?: string }
  | { status: "error"; message: string };
type AuthContextValue = {
  state: AuthState;
  acceptSession: (session: Session) => Promise<void>;
  retry: () => void;
};
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "checking" });
  const [attempt, setAttempt] = useState(0);
  const version = useRef(0);
  const commit = useCallback(async (user: User | null, message?: string) => {
    const latest = ++version.current;
    setState({ status: "checking" });
    await queryClient.cancelQueries({ queryKey: privateKeys.all });
    if (latest !== version.current) return;
    queryClient.removeQueries({ queryKey: privateKeys.all });
    setState(
      user
        ? { status: "authenticated", user }
        : { status: "anonymous", message },
    );
  }, []);
  const acceptSession = useCallback(
    (session: Session) => commit(session.user),
    [commit],
  );
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState({ status: "checking" });
    getSession(controller.signal)
      .then((session) => {
        if (active) return acceptSession(session);
      })
      .catch((error) => {
        if (active && !controller.signal.aborted)
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "We could not check your session.",
          });
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt, acceptSession]);
  return (
    <AuthContext value={{ state, acceptSession, retry: () => setAttempt((n) => n + 1) }}>
      {children}
    </AuthContext>
  );
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth needs AuthProvider.");
  return value;
}
export function SessionStatus() {
  const { state, retry } = useAuth();
  if (state.status === "checking")
    return (
      <section className="empty" role="status">
        <p className="eyebrow">One moment</p>
        <h1>Checking your session…</h1>
        <p>We’re finding the right place for you.</p>
      </section>
    );
  if (state.status === "error")
    return (
      <section className="empty" role="alert">
        <h1>We couldn’t check your session.</h1>
        <p>{state.message}</p>
        <button onClick={retry}>Try again</button>
      </section>
    );
  return null;
}
