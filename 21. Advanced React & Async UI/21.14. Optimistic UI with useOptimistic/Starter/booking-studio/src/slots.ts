export type Slot = "morning" | "evening";
export const slots: Record<
  Slot,
  { label: string; time: string; price: number }
> = {
  morning: { label: "Morning", time: "10:00 – 12:00", price: 64 },
  evening: { label: "Evening", time: "17:00 – 19:00", price: 79 },
};
export const money = (amount: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
