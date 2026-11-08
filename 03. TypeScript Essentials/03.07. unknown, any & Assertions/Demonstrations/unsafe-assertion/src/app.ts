type TicketCategory = "standard" | "student";

interface TicketRequest {
  ticketCount: number;
  category: TicketCategory;
}

const request = JSON.parse('{"ticketCount":"3","category":"student"}') as TicketRequest;
console.log(`Next count: ${request.ticketCount + 1}`);
