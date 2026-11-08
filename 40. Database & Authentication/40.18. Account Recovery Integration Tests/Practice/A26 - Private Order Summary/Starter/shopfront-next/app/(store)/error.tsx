"use client";
export default function StoreError({ retry }: { retry: () => void }) {
 return (
  <section className="panel error">
   <h1>We could not load this page</h1>
   <p>The sample catalog is temporarily unavailable. Please try again.</p>
   <button onClick={retry}>Try again</button>
  </section>
 );
}
