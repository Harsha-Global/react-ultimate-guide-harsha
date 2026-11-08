import { PurchasePanel } from '@/components/PurchasePanel';
export default function PurchasePage() {
  return (
    <section className="fs-shell">
      <p className="fs-eyebrow">Server workflow</p>
      <h1>A price the server decides.</h1>
      <p>Use a disposable course account. This workshop makes no real purchases.</p>
      <PurchasePanel/>
    </section>
  );
}
