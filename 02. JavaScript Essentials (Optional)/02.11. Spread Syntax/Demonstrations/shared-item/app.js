const original = [{ name: "Desk Lamp", unitPrice: 18 }];
const copied = [...original];
copied[0].unitPrice = 22;
console.log(original[0].unitPrice);
console.log(copied[0].unitPrice);
