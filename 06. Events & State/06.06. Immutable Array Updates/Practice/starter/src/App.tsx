import { useState } from "react";
import { changeCartQuantity } from "./cart";
import type { CartItem } from "./cart";

export default function App() {
  const [items, setItems] = useState<CartItem[]>([
    { id: "early", showtime: "18:00", quantity: 1, unitPrice: 12 },
    { id: "late", showtime: "21:00", quantity: 2, unitPrice: 15 },
  ]);
  return <main><h1>Ticket cart</h1><ul>{items.map(item => <li key={item.id}>
    <p>{item.showtime}: {item.quantity} tickets</p>
    <button type="button" onClick={() => setItems(current => changeCartQuantity(current, item.id, 1))}>Add {item.showtime}</button>
  </li>)}</ul></main>;
}
