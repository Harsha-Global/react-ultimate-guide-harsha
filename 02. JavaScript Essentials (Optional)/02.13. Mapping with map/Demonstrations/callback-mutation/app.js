const original = [{ name: "Desk Lamp", unitPrice: 18 }];
const mapped = original.map(item => {
  item.unitPrice = 20;
  return item;
});
console.log(original[0].unitPrice);
console.log(mapped === original);
console.log(mapped[0] === original[0]);
