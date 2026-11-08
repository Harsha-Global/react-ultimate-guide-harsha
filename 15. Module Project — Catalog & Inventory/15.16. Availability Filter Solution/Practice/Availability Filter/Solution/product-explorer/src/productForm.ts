import type { ProductInput } from "./api";
export type ProductValues = {
  name: string;
  category: string;
  price: string;
  description: string;
  inStock: boolean;
  maxQuantity: string;
};
export type FieldErrors = Partial<Record<keyof ProductValues, string>>;
export function validateProduct(values: ProductValues): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2 || values.name.trim().length > 80)
    errors.name = "Use 2 to 80 characters for the name.";
  if (!["Home", "Travel", "Audio"].includes(values.category))
    errors.category = "Choose a listed category.";
  if (
    !/^\d+(\.\d{1,2})?$/.test(values.price) ||
    Number(values.price) <= 0 ||
    Number(values.price) > 10000
  )
    errors.price =
      "Enter a price from 0.01 to 10000, with at most two decimal places.";
  if (
    values.description.trim().length < 10 ||
    values.description.trim().length > 240
  )
    errors.description = "Use 10 to 240 characters for the description.";
  const quantity = Number(values.maxQuantity);
  if (
    !/^\d+$/.test(values.maxQuantity) ||
    !Number.isInteger(quantity) ||
    quantity > 99 ||
    (values.inStock && quantity < 1) ||
    (!values.inStock && quantity !== 0)
  )
    errors.maxQuantity = "Use 1 to 99 when in stock, or 0 when unavailable.";
  return errors;
}
export function productInput(values: ProductValues): ProductInput {
  return {
    ...values,
    name: values.name.trim(),
    description: values.description.trim(),
    price: Number(values.price),
    maxQuantity: Number(values.maxQuantity),
  };
}
