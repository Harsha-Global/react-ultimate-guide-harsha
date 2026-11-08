import { productFormSchema } from "../shared/productSchema.ts";
const draft = { name: "Trail Backpack", category: "Travel", description: "A lightweight bag for daily trips.", price: "79", maxQuantity: "2", inStock: true, image: "/assets/backpack.webp", features: [{ text: "Lightweight" }] };
for (const [label, value] of [
  ["Accepted strings become numbers", draft],
  ["An empty price stays invalid", { ...draft, price: "" }],
  ["Unavailable needs zero quantity", { ...draft, inStock: false }],
  ["Unavailable with zero is accepted", { ...draft, inStock: false, maxQuantity: "0" }],
] as const) {
  const result = productFormSchema.safeParse(value);
  console.log(label, result.success ? { price: result.data.price, priceType: typeof result.data.price, maxQuantity: result.data.maxQuantity } : result.error.issues.map(issue => ({ field: issue.path.join("."), message: issue.message })));
}
