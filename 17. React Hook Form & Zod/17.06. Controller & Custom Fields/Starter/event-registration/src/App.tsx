import { RegistrationForm } from "./RegistrationForm.tsx";
export default function App() {
  return (
    <>
      <header className="topbar">
        <div className="brand">
          Event<em>Desk.</em>
        </div>
        <span className="tag">A little time for something new</span>
      </header>
      <main className="page">
        <p className="eyebrow">Workshops / Denver</p>
        <h1>Make room for creativity.</h1>
        <p className="intro">
          Join a small group, try something new, and leave with something you
          made. Your place starts with a few details.
        </p>
        <div className="layout">
          <aside className="event-card" aria-labelledby="event-title">
            <div className="poster" aria-hidden="true" />
            <div className="event-content">
              <p>THE WEEKEND SERIES</p>
              <h2 id="event-title">Studio painting</h2>
              <p>
                A relaxed introduction to color and composition, with all
                materials included.
              </p>
              <div className="event-facts">
                <div>
                  <span>Location</span>
                  <strong>Denver studio</strong>
                </div>
                <div>
                  <span>Duration</span>
                  <strong>2 hours</strong>
                </div>
              </div>
            </div>
          </aside>
          <section className="panel" aria-labelledby="form-title">
            <RegistrationForm />
          </section>
        </div>
        <p className="footer">
          Course demonstration · No payment or real reservation is made.
        </p>
      </main>
    </>
  );
}
