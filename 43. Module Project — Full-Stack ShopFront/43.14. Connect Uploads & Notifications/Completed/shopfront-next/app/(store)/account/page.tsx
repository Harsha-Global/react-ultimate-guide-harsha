import Link from 'next/link';
import { connection } from 'next/server';
import { AccountPanel } from '@/components/AccountPanel';
export const metadata = { title: 'Your account', robots: { index: false, follow: false } };
export default async function AccountPage() {
  await connection();
  return (
    <>
      <p className="eyebrow">YOUR SHOPFRONT</p>
      <h1>Your account</h1>
      <p>Sign in to see your own orders or the teams you belong to.</p>
      <AccountPanel githubEnabled={Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)} callbackURL="/account"/>
      <nav className="fs-actions" aria-label="Account destinations">
        <Link href="/orders">Your orders</Link>
        <Link href="/merchant">Merchant workspaces</Link>
      </nav>
    </>
  );
}
