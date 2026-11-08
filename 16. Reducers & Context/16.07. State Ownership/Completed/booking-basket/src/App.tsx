import { Header } from "./components/Header.tsx";
import { CatalogView } from "./components/CatalogView.tsx";
import { ContactDraft } from "./components/ContactDraft.tsx";
import { BasketPanel } from "./components/BasketPanel.tsx";
import { OrderSummary } from "./components/OrderSummary.tsx";
import { PageShell } from "./components/PageShell.tsx";
import { BasketProvider } from "./BasketProvider.tsx";

export default function App() {
  return (
    <BasketProvider>
      <PageShell header={<Header />} summary={<OrderSummary />}>
        <CatalogView />

        <BasketPanel />

        <ContactDraft />
      </PageShell>
    </BasketProvider>
  );
}
