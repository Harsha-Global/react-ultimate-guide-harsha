import { notFound } from 'next/navigation';
import { findProduct } from '@/lib/products';
import { ProductDetails } from '@/components/ProductDetails';
import { ProductModal } from '@/components/ProductModal';

export default async function ProductOverlay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  return <ProductModal name={product.name} slug={product.slug}><ProductDetails product={product} /></ProductModal>;
}
