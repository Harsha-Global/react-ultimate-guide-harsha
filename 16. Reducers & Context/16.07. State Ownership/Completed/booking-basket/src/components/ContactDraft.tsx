import { useState } from "react";

export function ContactDraft() {
  const [email, setEmail] = useState("");

  return (
    <section className="draft" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact draft</h2>

      <label htmlFor="contact-email">
        Email for your plans
        <input id="contact-email" type="email" value={email}
          onChange={(e) => setEmail(e.currentTarget.value)} autoComplete="email" />
      </label>

      <p>This is a local draft. It has not been submitted or saved.</p>
    </section>
  );
}
