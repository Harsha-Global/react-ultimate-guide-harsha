import Link from 'next/link';
export function PrivateMessage({ message }: { message: string }) {
  return (
    <section className="fs-card">
      <h1>Account access</h1>
      <p role="alert">{message}</p>
      <Link href="/account">Open your account</Link>
    </section>
  );
}
