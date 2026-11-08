import { notFound } from 'next/navigation';
import { findProduct } from '@/lib/products';
import { ProductDetails } from '@/components/ProductDetails';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  return <main><h1>{product.name}</h1><ProductDetails product={product} /></main>;
}
