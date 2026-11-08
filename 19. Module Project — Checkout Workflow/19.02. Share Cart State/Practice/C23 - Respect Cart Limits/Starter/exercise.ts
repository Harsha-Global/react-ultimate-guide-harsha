type CartLine = Readonly<{ productId: string; quantity: number }>;
type Product = Readonly<{ id: string; inStock: boolean; maxQuantity: number }>;

function addToCart(lines: readonly CartLine[], product: Product): CartLine[] {
  if (!product.inStock || product.maxQuantity < 1) return [...lines];
  const current = lines.find((line) => line.productId === product.id);
  // BUG: an existing line is increased even when it has reached its product limit.
  if (!current) return [...lines, { productId: product.id, quantity: 1 }];
  return lines.map((line) => line.productId === product.id ? { ...line, quantity: line.quantity + 1 } : line);
}
