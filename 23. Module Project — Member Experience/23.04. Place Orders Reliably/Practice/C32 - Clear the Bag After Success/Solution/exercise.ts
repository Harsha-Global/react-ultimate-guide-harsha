type SavedOrder = { id: string; total: number };
type OrderUI = { showConfirmation: (order: SavedOrder) => void; clearBag: () => void; showError: (message: string) => void };
async function submitOrder(placeOrder: () => Promise<SavedOrder>, ui: OrderUI): Promise<void> {
  try {
    const order = await placeOrder();
    ui.showConfirmation(order);
    ui.clearBag();
  } catch (error) {
    ui.showError(error instanceof Error ? error.message : "We could not confirm the order.");
  }
}
