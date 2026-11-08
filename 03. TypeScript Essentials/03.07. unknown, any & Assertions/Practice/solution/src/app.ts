type TicketCategory = "standard" | "student";

interface TicketRequest {
  ticketCount: number;
  category: TicketCategory;
}

function parseTicketRequest(text: string): TicketRequest {
  const value: unknown = JSON.parse(text);
  if (typeof value !== "object" || value === null) {
    throw new Error("Booking data must be an object");
  }
  if (
    !("ticketCount" in value) ||
    typeof value.ticketCount !== "number" ||
    !Number.isInteger(value.ticketCount) ||
    value.ticketCount < 1
  ) {
    throw new Error("Ticket count must be a positive whole number");
  }
  if (
    !("category" in value) ||
    (value.category !== "standard" && value.category !== "student")
  ) {
    throw new Error("Choose a supported ticket category");
  }
  return { ticketCount: value.ticketCount, category: value.category };
}

function savedTicketTotal(text: string): number {
  const request = parseTicketRequest(text);
  const price = request.category === "student" ? 12 * 0.8 : 12;
  return price * request.ticketCount + 3;
}

console.log(savedTicketTotal('{"ticketCount":2,"category":"standard"}'));
try {
  console.log(savedTicketTotal('{"ticketCount":"3","category":"student"}'));
} catch (error) {
  console.log(error instanceof Error ? error.message : "Unable to read booking");
}
