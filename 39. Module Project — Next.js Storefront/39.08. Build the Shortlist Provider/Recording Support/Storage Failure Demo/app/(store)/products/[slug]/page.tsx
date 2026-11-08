import { notFound } from 'next/navigation';
import { readStorefrontProduct } from '@/lib/storefront';
import { ProductDetails } from '@/components/ProductDetails';
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 const product = await readStorefrontProduct(slug);
 if (!product) notFound();
 return <><h1>{product.name}</h1><ProductDetails product={product} featured/></>;
}
