type TicketCategory = "standard" | "student";

function selectedTicketTotal(
  price: number,
  count: number,
  category: TicketCategory | null,
): number | undefined {
  if (category === null) {
    return undefined;
  }
  if (category === "student") {
    return price * 0.8 * count;
  }
  return price * count;
}

console.log(selectedTicketTotal(12, 2, "standard"));
console.log(selectedTicketTotal(12, 2, "student"));
console.log(selectedTicketTotal(12, 2, null));
