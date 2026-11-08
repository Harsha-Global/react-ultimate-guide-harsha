import { Link, Outlet } from "react-router";
import { useAuth } from "./Auth";
import { SignOutButton } from "./SignOutButton";
export default function App() {
  const { state } = useAuth();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <div className="inner">
          <a className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              ✦
            </span>
            cedar club.
          </a>
          <nav aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/account">My account</Link>
            {state.status === "authenticated" ? (
              <SignOutButton />
            ) : state.status === "anonymous" ? (
              <Link to="/login">Sign in</Link>
            ) : null}
          </nav>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer>
        Cedar Club · A local course example · Sample accounts and details only
      </footer>
    </>
  );
}
