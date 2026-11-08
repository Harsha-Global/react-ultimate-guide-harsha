type CatalogRecord = { id: string; name: string; priceMinor: number; supplierCost?: number; warehouseReference?: string };
type PublicProduct = Pick<CatalogRecord, 'id' | 'name' | 'priceMinor'>;
function toPublicProduct(product: CatalogRecord): PublicProduct {
  // Return a new object containing only the three public properties.
  return { ...product };
}
