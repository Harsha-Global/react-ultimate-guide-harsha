const movieName = "Skyward";
const ticketPrice = 12;
const bookingFee = 3;
let ticketCount: number;
ticketCount = 2;

const availablePrices: number[] = [12, 15, 18];
let isSoldOut = false;
isSoldOut = "false";

const total = ticketPrice * ticketCount + bookingFee;
console.log(`${movieName}: ${ticketCount} tickets, total ${total}`);
console.log(`Price options: ${availablePrices.join(", ")}`);
console.log(`Sold out: ${isSoldOut}`);
