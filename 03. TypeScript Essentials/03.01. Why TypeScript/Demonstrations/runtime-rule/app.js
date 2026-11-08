const ticketPrice = 12;
const ticketCount = -1;

if (ticketCount < 1) {
  console.log("Choose at least one ticket");
} else {
  console.log(`Total: ${ticketPrice * ticketCount}`);
}
