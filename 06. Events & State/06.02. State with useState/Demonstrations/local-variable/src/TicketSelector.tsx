
export default function TicketSelector() {
  let quantity = 1;

  function handleIncrease() {
    quantity += 1;
    console.log(`Local quantity: ${quantity}`);
  }

  return (
    <div>
      <p aria-live="polite">Tickets: {quantity}</p>
      <button type="button" onClick={handleIncrease}>Add one ticket</button>
    </div>
  );
}
