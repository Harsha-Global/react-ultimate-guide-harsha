const original = [{ id: "p2", count: 1 }];
const copied = [...original];
copied[0].count = 4;
console.log(original[0].count);
console.log(copied === original);
console.log(copied[0] === original[0]);
