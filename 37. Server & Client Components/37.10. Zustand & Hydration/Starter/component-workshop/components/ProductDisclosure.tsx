'use client';
import { useId, useState, type ReactNode } from 'react';
import type { ProductPreview } from '@/lib/productPreview';
export function ProductDisclosure({ product, children }: { product: ProductPreview; children: ReactNode }) {
 const [open, setOpen] = useState(false);
 const regionId = useId();
 return <section className="panel"><button aria-expanded={open} aria-controls={regionId} onClick={() => setOpen(value => !value)}>{open ? 'Hide' : 'Show'} the story for {product.name}</button><div id={regionId} hidden={!open}>{children}</div></section>;
}
