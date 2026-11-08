export type Order = {
  id: string;
  customer: string;
  item: string;
  units: number;
  total: number;
  status: "ready" | "payment-pending" | "shipped";
};
// Supplied sample records, not an API cache or mutable Redux order slice.
export const orders: readonly Order[] = [
  {
    id: "OD-1041",
    customer: "Avery Miller",
    item: "Trail Backpack",
    units: 2,
    total: 158,
    status: "ready",
  },
  {
    id: "OD-1042",
    customer: "Jordan Lee",
    item: "Desk Lamp",
    units: 1,
    total: 64,
    status: "payment-pending",
  },
  {
    id: "OD-1043",
    customer: "Casey Reed",
    item: "Travel Mug",
    units: 3,
    total: 72,
    status: "ready",
  },
  {
    id: "OD-1044",
    customer: "Morgan Hayes",
    item: "Linen Throw",
    units: 1,
    total: 49,
    status: "shipped",
  },
  {
    id: "OD-1045",
    customer: "Riley Carter",
    item: "Desk Organizer",
    units: 2,
    total: 56,
    status: "ready",
  },
];
export const statusLabels = {
  ready: "Ready to pack",
  "payment-pending": "Payment pending",
  shipped: "Shipped",
};
export const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
