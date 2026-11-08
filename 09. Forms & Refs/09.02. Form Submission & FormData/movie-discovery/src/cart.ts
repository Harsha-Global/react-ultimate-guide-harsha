export type CartItem = {
  readonly id: string;
  readonly showtime: string;
  readonly quantity: number;
  readonly unitPrice: number;
};

export function addBooking(items: readonly CartItem[], booking: CartItem): CartItem[] {
  const existing = items.find(item => item.id === booking.id);
  if (!existing) return [...items, booking];
  return items.map(item => item.id === booking.id
    ? { ...item, quantity: Math.min(6, item.quantity + booking.quantity) }
    : item);
}

export function changeCartQuantity(items: readonly CartItem[], id: string, change: number): CartItem[] {
  return items.map(item => item.id === id
    ? { ...item, quantity: Math.max(1, Math.min(6, item.quantity + change)) }
    : item);
}
