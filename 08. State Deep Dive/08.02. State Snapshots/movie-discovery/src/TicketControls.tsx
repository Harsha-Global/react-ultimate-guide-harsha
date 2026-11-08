type TicketControlsProps = {
  readonly quantity: number;
  readonly onQuantityChange: (change: number) => void;
};

export default function TicketControls({ quantity, onQuantityChange }: TicketControlsProps) {
  return (
    <div>
      <p aria-live="polite">Tickets: {quantity}</p>
      <button type="button" disabled={quantity === 1} onClick={() => onQuantityChange(-1)}>Remove one ticket</button>
      <button type="button" disabled={quantity === 6} onClick={() => onQuantityChange(1)}>Add one ticket</button>
      <button type="button" disabled={quantity === 6} onClick={() => onQuantityChange(2)}>Add two tickets</button>
    </div>
  );
}
