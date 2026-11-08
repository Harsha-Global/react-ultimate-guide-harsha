type TicketCategory = "standard" | "student";

interface TicketRequest {
  ticketCount: number;
  category: TicketCategory;
}

function parseTicketRequest(text: string): TicketRequest {
  return JSON.parse(text) as TicketRequest;
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
