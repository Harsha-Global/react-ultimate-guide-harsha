import Link from 'next/link';
import { readMyWorkspaces } from '@/lib/merchant';
import { AccessError } from '@/lib/orderAccess';
import { PrivateMessage } from '@/components/PrivateMessage';
export const metadata = { title: 'Merchant workspaces', robots: { index: false, follow: false } };
export default async function MerchantPage() {
  let workspaces;
  try {
    workspaces = await readMyWorkspaces();
  } catch (error) {
    if (error instanceof AccessError) return <PrivateMessage message={error.message}/>;
    throw error;
  }
  return (
    <>
      <p className="eyebrow">MERCHANT SPACE</p>
      <h1>Your workspaces</h1>
      <p>Open a team to manage its inventory and its part of each order.</p>
      {workspaces.length ? (
        <div className="sf-order-list">
          {workspaces.map(workspace => (
            <article className="fs-card" key={workspace.id}>
              <h2>
                <Link href={`/merchant/${workspace.id}`}>{workspace.name}</Link>
              </h2>
              <p>{workspace.id}</p>
            </article>
          ))}
        </div>
      ) : <p className="fs-card">You do not belong to a merchant workspace yet.</p>}
    </>
  );
}
