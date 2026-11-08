import { NavLink, Outlet, useNavigation } from "react-router";
export default function App() {
  const navigation = useNavigation();
  return (
    <>
      <header className="topbar">
        <div className="brand">
          Event<em>Desk.</em>
        </div>
        <nav aria-label="Main navigation">
          <NavLink to="/events">Workshops</NavLink>
          <NavLink to="/about">About the series</NavLink>
        </nav>
      </header>
      <main className="page">
        <div className="hero">
          <div>
            <p className="eyebrow">The weekend series / Denver</p>
            <h1>A new perspective starts here.</h1>
            <p className="lead">
              A table to gather around. A city to see differently. A little
              space to make something of your own.
            </p>
          </div>
          <img className="hero-art" src="/assets/painting.svg" alt="Art materials for a creative workshop" />
        </div>
        {navigation.state !== "idle" && (
          <p className="status" role="status">
            Opening workshop…
          </p>
        )}
        <Outlet />
        <p className="footer">
          Course practice catalog · No real booking or public event is changed.
        </p>
      </main>
    </>
  );
}
