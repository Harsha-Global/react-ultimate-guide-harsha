import RouteFocus from "./RouteFocus";
import { NavLink, Outlet } from "react-router";
export default function Layout() {
    return (
        <div className="shell">
            <a
              className="skip"
              href="#main-content"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("main-content")?.focus();
                          }}
            >
              Skip to content
            </a>
            <RouteFocus />
            <header>
                <p className="eyebrow">People & teams</p>
                <nav aria-label="Main">
                    <NavLink to="/" end>
                        Home
                    </NavLink>
                    <NavLink to="/employees">Employees</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </header>
            <main id="main-content" tabIndex={-1}>
                <Outlet />
            </main>
        </div>
    );
}
