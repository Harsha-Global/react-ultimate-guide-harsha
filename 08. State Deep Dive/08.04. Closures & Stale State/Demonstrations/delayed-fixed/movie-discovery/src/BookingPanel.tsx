import { useState } from "react";
import QuoteCard from "./Quote";
import type { Quote } from "./Quote";
import { createStarterCart } from "./starterCart";
import type { ChangeEvent } from "react";
import { addBooking, changeCartQuantity } from "./cart";
import type { CartItem } from "./cart";
import TicketCart from "./TicketCart";
import TicketControls from "./TicketControls";
import BookingSummary from "./BookingSummary";

export default function BookingPanel() {
  const [quantity, setQuantity] = useState(1);
  const [adjustment, setAdjustment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [showtime, setShowtime] = useState("18:00");
  const [cart, setCart] = useState<CartItem[]>(createStarterCart);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const ticketPrice = showtime === "21:00" ? 15 : 12;
  const total = quantity * ticketPrice;

  function handlePrepareQuote() {
    const requestedQuote: Quote = { guestName, showtime, quantity, total };
    setIsPreparing(true);
    setQuote(null);
    window.setTimeout(() => {
      setQuote(requestedQuote);
      setIsPreparing(false);
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
    setGuestName(event.currentTarget.value);
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
      <input id="guest-name" value={guestName} onChange={handleGuestNameChange} />
      <label htmlFor="showtime">Showtime</label>
      <select id="showtime" value={showtime} onChange={event => setShowtime(event.currentTarget.value)}>
        <option value="18:00">18:00 — $12</option>
        <option value="21:00">21:00 — $15</option>
      </select>
      <button type="button" onClick={handleEveningForTwo}>Evening for two</button>
      <TicketControls quantity={quantity} onQuantityChange={handleQuantityChange} />
      <button type="button" disabled={quantity === 6} onClick={handleAddAndDescribe}>Add ticket and describe</button>
      {adjustment && <p className="feedback" role="status">{adjustment}</p>}
      <BookingSummary quantity={quantity} guestName={guestName} showtime={showtime} total={total} />
      <button type="button" disabled={isPreparing} onClick={handlePrepareQuote}>Prepare quote</button>
      {isPreparing && <p role="status">Preparing your quote…</p>}
      {quote && <QuoteCard quote={quote} />}
      <button type="button" onClick={handleAddBooking}>Add booking to cart</button>
      <TicketCart items={cart} selectedId={selectedId} onSelect={setSelectedId}
        onChangeQuantity={handleCartQuantityChange} onRemove={handleRemove} />
    </>
  );
}
