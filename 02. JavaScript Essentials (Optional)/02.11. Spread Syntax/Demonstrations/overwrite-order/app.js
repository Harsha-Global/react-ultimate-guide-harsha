const original = { name: "Desk Lamp", unitPrice: 18 };
const firstOverride = { unitPrice: 20, ...original };
const lastOverride = { ...original, unitPrice: 20 };
console.log(firstOverride.unitPrice);
console.log(lastOverride.unitPrice);
console.log(original.unitPrice);
