import { useRef, type ComponentProps } from "react";
import type { DisplayLocale } from "../displayFormats";
import type { Product } from "../catalog";
import { formatPrice } from "../catalog";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ProductDetailsContent({ product, onCloseAutoFocus, locale = "en-US" }: { product: Product; locale?: DisplayLocale; onCloseAutoFocus?: ComponentProps<typeof DialogContent>["onCloseAutoFocus"] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const availability = product.stock === 0 ? "Unavailable" : product.stock < 5 ? "Low stock" : "In stock";

  return (
    <DialogContent onCloseAutoFocus={onCloseAutoFocus} aria-modal="true" className="max-h-[calc(100dvh-2rem)] overflow-y-auto" onOpenAutoFocus={(event) => {
      event.preventDefault();
      titleRef.current?.focus();
    }}>
      <DialogHeader className="pr-10 text-left">
        <DialogTitle ref={titleRef} tabIndex={-1} className="rounded-sm text-xl leading-snug focus:outline-2 focus:outline-offset-4 focus:outline-ring">
          {product.name}
        </DialogTitle>
        <DialogDescription>Review the current price and availability for this product.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-wrap items-start gap-5">
        <img src={product.image} width={112} height={112} alt="" className="size-28 rounded-xl object-cover" />
        <dl className="min-w-0 flex-1 basis-44 space-y-3">
          <div><dt className="text-sm text-muted-foreground">Category</dt><dd className="font-semibold">{product.category}</dd></div>
          <div><dt className="text-sm text-muted-foreground">Price</dt><dd className="font-semibold tabular-nums">{formatPrice(product.priceMinor, locale)}</dd></div>
          <div><dt className="text-sm text-muted-foreground">Availability</dt><dd className="font-semibold">{availability} · {product.stock} units</dd></div>
        </dl>
      </div>
      <DialogFooter>
        <DialogClose asChild><Button type="button" variant="outline">Done</Button></DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
