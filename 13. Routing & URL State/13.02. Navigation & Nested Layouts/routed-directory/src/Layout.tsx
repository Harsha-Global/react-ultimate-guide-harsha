import { NavLink, Outlet } from "react-router";
export default function Layout() {
    return (
        <div className="shell">
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
            <main id="main-content">
                <Outlet />
            </main>
        </div>
    );
}
