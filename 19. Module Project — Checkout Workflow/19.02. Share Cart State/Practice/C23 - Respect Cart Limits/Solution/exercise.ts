type CartLine = Readonly<{ productId: string; quantity: number }>;
type Product = Readonly<{ id: string; inStock: boolean; maxQuantity: number }>;

function addToCart(lines: readonly CartLine[], product: Product): CartLine[] {
  if (!product.inStock || product.maxQuantity < 1) return [...lines];
  const current = lines.find((line) => line.productId === product.id);
  if (current && current.quantity >= product.maxQuantity) return [...lines];
  if (!current) return [...lines, { productId: product.id, quantity: 1 }];
  return lines.map((line) => line.productId === product.id ? { ...line, quantity: line.quantity + 1 } : line);
}
