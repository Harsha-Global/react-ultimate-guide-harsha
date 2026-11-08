import { Header } from "./components/Header.tsx";
import { EventCatalog } from "./components/EventCatalog.tsx";
import { BasketPanel } from "./components/BasketPanel.tsx";
import { OrderSummary } from "./components/OrderSummary.tsx";
import { PageShell } from "./components/PageShell.tsx";
import { BasketProvider } from "./BasketProvider.tsx";

export default function App() {
  return (
    <BasketProvider>
      <PageShell header={<Header />} summary={<OrderSummary />}>
        <EventCatalog />

        <BasketPanel />
      </PageShell>
    </BasketProvider>
  );
}
