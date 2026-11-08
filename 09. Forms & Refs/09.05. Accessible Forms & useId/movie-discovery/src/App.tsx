import { useState } from "react";
import BookingPanel from "./BookingPanel";
import CustomerForm from "./CustomerForm";
import { createCustomerDraft } from "./customer";
import PageHeader from "./PageHeader";
import MovieCatalog from "./MovieCatalog";
import Panel from "./Panel";
import { movies } from "./movies";

export default function App() {
  const [draft, setDraft] = useState(createCustomerDraft);
  const guest = { name: draft.fullName, contact: { city: draft.city, email: draft.email } };
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to booking</a>
      <main id="main-content" tabIndex={-1}>
        <PageHeader />
        <MovieCatalog movies={movies} />
        <Panel title="Customer details and preferences">
          <CustomerForm draft={draft} onChange={setDraft} />
        </Panel>
        <Panel title="Configure your Skyward booking">
          <BookingPanel guest={guest} />
        </Panel>
      </main>
    </>
  );
}
