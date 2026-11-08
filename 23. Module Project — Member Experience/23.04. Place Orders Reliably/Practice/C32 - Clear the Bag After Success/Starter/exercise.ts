type SavedOrder = { id: string; total: number };
type OrderUI = { showConfirmation: (order: SavedOrder) => void; clearBag: () => void; showError: (message: string) => void };
async function submitOrder(placeOrder: () => Promise<SavedOrder>, ui: OrderUI): Promise<void> {
  // TODO: use the confirmed result before clearing the bag.
  ui.clearBag();
}
