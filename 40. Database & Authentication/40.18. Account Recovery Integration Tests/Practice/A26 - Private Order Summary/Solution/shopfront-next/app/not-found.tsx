import Link from "next/link";
export default function NotFound(){return (
  <main className="wrap">
    <h1>Page not found</h1>
    <p>Choose a public page from the navigation.</p>
    <Link href="/">Back to home</Link>
  </main>
);}
