import { AuthForm } from "./AuthForm";
export default function App() {
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
        </div>
      </header>
      <main id="main">
        <div className="hero">
          <section>
            <p className="eyebrow">Good company starts here</p>
            <h1>
              A place for
              <br />
              your next chapter.
            </h1>
            <p className="lead">
              Gather with curious people. Save a plan for the weekend. Make a
              little space for something new.
            </p>
            <div className="art" aria-hidden="true">
              <span className="sun" />
              <span className="hill back" />
              <span className="hill" />
              <span className="quote">Closer to what matters.</span>
            </div>
          </section>
          <AuthForm />
        </div>
      </main>
      <footer>
        Cedar Club · A local course example · Sample accounts and details only
      </footer>
    </>
  );
}
