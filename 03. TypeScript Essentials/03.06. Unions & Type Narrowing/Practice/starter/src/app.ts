type TicketCategory = "standard" | "student";

function selectedTicketTotal(
  price: number,
  count: number,
  category: TicketCategory | null,
): number | undefined {
  // Handle the missing selection, then calculate the selected ticket total.
  return 0;
}

console.log(selectedTicketTotal(12, 2, "standard"));
console.log(selectedTicketTotal(12, 2, "student"));
console.log(selectedTicketTotal(12, 2, null));
