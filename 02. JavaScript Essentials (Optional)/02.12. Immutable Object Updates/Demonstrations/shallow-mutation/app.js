const original = {
  name: "Desk Lamp",
  delivery: { city: "Hyderabad", fee: 40 }
};
const changed = { ...original };
changed.delivery.city = "Pune";
console.log(original.delivery.city);
console.log(changed.delivery.city);
console.log(original === changed);
console.log(original.delivery === changed.delivery);
