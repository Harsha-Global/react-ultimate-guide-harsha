const items = [
  { id: "first", unitPrice: 18 },
  { id: "second", unitPrice: 18 },
  { id: "lower", unitPrice: 12 }
];
const sorted = [...items].sort((left, right) => left.unitPrice - right.unitPrice);
console.log(sorted[0].id);
console.log(sorted[1].id);
console.log(sorted[2].id);
