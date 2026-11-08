import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import { productSchema, safeJsonLd } from '@/lib/productSchema';
import { notFound } from 'next/navigation';
import { readStorefrontProduct } from '@/lib/storefront';
import { ProductDetails } from '@/components/ProductDetails';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
 const product=await readStorefrontProduct((await params).slug);
 if(!product) return {title:'Product not found',robots:{index:false}};
 return {title:product.name,description:`Explore ${product.name}. ${product.stock ? `${product.stock} available in the sample collection.` : 'Currently unavailable.'}`,alternates:{canonical:`/products/${product.slug}`},openGraph:{title:product.name,images:[product.image]}};
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 const product = await readStorefrontProduct(slug);
 if (!product) notFound();
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(productSchema(product,siteUrl.href))}}/><h1>{product.name}</h1><ProductDetails product={product} featured/></>;
}
