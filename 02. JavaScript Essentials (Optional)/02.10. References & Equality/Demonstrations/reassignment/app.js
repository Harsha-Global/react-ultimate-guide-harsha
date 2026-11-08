const firstProduct = { name: "Desk Lamp", unitPrice: 15 };
let chosenProduct = firstProduct;
chosenProduct = { name: "Desk Lamp", unitPrice: 18 };
console.log(firstProduct.unitPrice);
console.log(chosenProduct.unitPrice);
console.log(chosenProduct === firstProduct);
