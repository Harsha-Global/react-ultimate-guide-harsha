import { useState } from "react";
import { logout } from "./sessionApi";
import { useAuth } from "./Auth";
export function SignOutButton() {
    const { acceptSession } = useAuth();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    async function signOut() {
        setPending(true);
        setError("");
        try {
            await acceptSession(await logout());
        }
        catch {
            setError("We couldn’t sign out. Please try again.");
        }
        finally {
            setPending(false);
        }
    }
    return (<div>
      <button className="secondary" disabled={pending} onClick={signOut}>
        {pending ? "Signing out…" : "Sign out"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>);
}
