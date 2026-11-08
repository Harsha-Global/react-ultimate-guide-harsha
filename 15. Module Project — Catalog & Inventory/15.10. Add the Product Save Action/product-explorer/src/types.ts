export type Product = {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly inStock: boolean;
  readonly maxQuantity: number;
  readonly image: string;
  readonly description: string;
};
