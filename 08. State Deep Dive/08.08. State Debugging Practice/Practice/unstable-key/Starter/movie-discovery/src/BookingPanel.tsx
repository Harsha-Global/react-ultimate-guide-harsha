import { useState } from "react";
import BookingNote from "./BookingNote";
import QuoteCard from "./Quote";
import type { Quote } from "./Quote";
import type { QuoteState } from "./quoteState";
import { createStarterCart } from "./starterCart";
import type { ChangeEvent } from "react";
import { createGuest, changeCity } from "./guest";
import { addBooking, changeCartQuantity } from "./cart";
import type { CartItem } from "./cart";
import TicketCart from "./TicketCart";
import TicketControls from "./TicketControls";
import BookingSummary from "./BookingSummary";

export default function BookingPanel() {
  const [quantity, setQuantity] = useState(1);
  const [compact, setCompact] = useState(false);
  const [adjustment, setAdjustment] = useState("");
  const [guest, setGuest] = useState(createGuest);
  const [showtime, setShowtime] = useState("18:00");
  const [cart, setCart] = useState<CartItem[]>(createStarterCart);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quoteState, setQuoteState] = useState<QuoteState>({ status: "idle" });
  const ticketPrice = showtime === "21:00" ? 15 : 12;
  const total = quantity * ticketPrice;

  function handlePrepareQuote() {
    const requestedQuote: Quote = { guestName: guest.name, showtime, quantity, total };
    setQuoteState({ status: "preparing" });
    window.setTimeout(() => {
      setQuoteState({ status: "ready", quote: requestedQuote });
    }, 2000);
  }

  function handleEveningForTwo() {
    setQuantity(2);
    setShowtime("21:00");
    setAdjustment("Evening booking prepared for two tickets.");
  }

  function handleAddAndDescribe() {
    const nextQuantity = Math.min(6, quantity + 1);
    setQuantity(nextQuantity);
    setAdjustment(`Booking adjusted to ${nextQuantity} tickets.`);
  }

  function handleQuantityChange(change: number) {
    setQuantity(current => Math.max(1, Math.min(6, current + change)));
  }

  function handleGuestNameChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.currentTarget.value;
    setGuest(current => ({ ...current, name }));
  }

  function handleCityChange(event: ChangeEvent<HTMLInputElement>) {
    const city = event.currentTarget.value;
    setGuest(current => changeCity(current, city));
  }

  function handleSortCart() {
    setCart(current => [...current].sort((a, b) => b.showtime.localeCompare(a.showtime)));
  }

  function handleAddBooking() {
    const booking = { id: showtime, showtime, quantity, unitPrice: ticketPrice };
    setCart(current => addBooking(current, booking));
  }

  function handleCartQuantityChange(id: string, change: number) {
    setCart(current => changeCartQuantity(current, id, change));
  }

  function handleRemove(id: string) {
    setCart(current => current.filter(item => item.id !== id));
    setSelectedId(current => current === id ? null : current);
  }

  return (
    <>
      <label htmlFor="guest-name">Guest name</label>
      <input id="guest-name" value={guest.name} onChange={handleGuestNameChange} />
      <label htmlFor="guest-city">City</label>
      <input id="guest-city" value={guest.contact.city} onChange={handleCityChange} />
      <label htmlFor="showtime">Showtime</label>
      <select id="showtime" value={showtime} onChange={event => setShowtime(event.currentTarget.value)}>
        <option value="18:00">18:00 — $12</option>
        <option value="21:00">21:00 — $15</option>
      </select>
      <button type="button" onClick={handleEveningForTwo}>Evening for two</button>
      <TicketControls quantity={quantity} onQuantityChange={handleQuantityChange} />
      <button type="button" disabled={quantity === 6} onClick={handleAddAndDescribe}>Add ticket and describe</button>
      {adjustment && <p className="feedback" role="status">{adjustment}</p>}
      <BookingSummary quantity={quantity} guestName={guest.name} showtime={showtime} total={total} />
      <button type="button" onClick={() => setCompact(current => !current)}>Toggle compact note</button>
      <div className={compact ? "compact" : "comfortable"}>
        <BookingNote key={showtime} showtime={showtime} />
      </div>
      <button type="button" disabled={quoteState.status === "preparing"} onClick={handlePrepareQuote}>Prepare quote</button>
      {quoteState.status === "preparing" && <p role="status">Preparing your quote…</p>}
      {quoteState.status === "ready" && <QuoteCard quote={quoteState.quote} />}
      <button type="button" onClick={handleAddBooking}>Add booking to cart</button>
      <button type="button" onClick={handleSortCart}>Latest show first</button>
      <TicketCart items={cart} selectedId={selectedId} onSelect={setSelectedId}
        onChangeQuantity={handleCartQuantityChange} onRemove={handleRemove} />
    </>
  );
}
