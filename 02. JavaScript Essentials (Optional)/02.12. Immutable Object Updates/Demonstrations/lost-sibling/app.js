const original = {
  name: "Desk Lamp",
  delivery: { city: "Hyderabad", fee: 40 }
};
const changed = { ...original, delivery: { city: "Pune" } };
console.log(original.delivery.fee);
console.log(changed.delivery.fee);
