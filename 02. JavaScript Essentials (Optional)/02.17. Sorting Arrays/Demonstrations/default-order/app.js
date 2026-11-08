const prices = [2, 10, 1];
const defaultOrder = [...prices].sort();
const numericOrder = [...prices].sort((left, right) => left - right);
console.log(`Default: ${defaultOrder[0]}, ${defaultOrder[1]}, ${defaultOrder[2]}`);
console.log(`Numeric: ${numericOrder[0]}, ${numericOrder[1]}, ${numericOrder[2]}`);
