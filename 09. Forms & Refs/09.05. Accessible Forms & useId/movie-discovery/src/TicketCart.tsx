import type { CartItem } from "./cart";

type TicketCartProps = {
  readonly items: readonly CartItem[];
  readonly selectedId: string | null;
  readonly onSelect: (id: string) => void;
  readonly onChangeQuantity: (id: string, change: number) => void;
  readonly onRemove: (id: string) => void;
};

export default function TicketCart({ items, selectedId, onSelect, onChangeQuantity, onRemove }: TicketCartProps) {
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  if (items.length === 0) return <p>Your ticket cart is empty.</p>;

  return (
    <section aria-label="Ticket cart">
      <h3>Ticket cart</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <p>Skyward at {item.showtime}: {item.quantity} tickets</p>
            <button type="button" aria-pressed={selectedId === item.id} onClick={() => onSelect(item.id)}>Select {item.showtime}</button>
            <button type="button" disabled={item.quantity === 6} onClick={() => onChangeQuantity(item.id, 1)}>Add ticket at {item.showtime}</button>
            <button type="button" onClick={() => onRemove(item.id)}>Remove {item.showtime}</button>
          </li>
        ))}
      </ul>
      <p>Cart total: ${total}</p>
      <p>Selected show: {items.find(item => item.id === selectedId)?.showtime ?? "None"}</p>
    </section>
  );
}
