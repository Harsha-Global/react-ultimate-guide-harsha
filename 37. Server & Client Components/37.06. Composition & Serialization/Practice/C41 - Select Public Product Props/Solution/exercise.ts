type CatalogRecord = { id: string; name: string; priceMinor: number; supplierCost?: number; warehouseReference?: string };
type PublicProduct = Pick<CatalogRecord, 'id' | 'name' | 'priceMinor'>;
function toPublicProduct(product: CatalogRecord): PublicProduct {
  return { id: product.id, name: product.name, priceMinor: product.priceMinor };
}
