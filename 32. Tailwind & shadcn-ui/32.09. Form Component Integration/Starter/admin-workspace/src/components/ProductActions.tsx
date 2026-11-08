import { useRef, useState } from "react";
import type { Product } from "../catalog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductDetailsContent } from "./ProductDetails";

export function ProductActions({ product }: { product: Product }) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const pendingReview = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button ref={triggerRef} type="button" variant="outline" size="sm" aria-label={`Actions for ${product.name}`}>
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64 max-w-[calc(100vw-2rem)]" onCloseAutoFocus={(event) => {
          if (pendingReview.current) {
            pendingReview.current = false;
            event.preventDefault();
            setReviewOpen(true);
          }
        }}>
          <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => { pendingReview.current = true; }}>
            Review availability
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={product.image} target="_blank" rel="noreferrer">Open product image (new tab)</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductDetailsContent product={product} onCloseAutoFocus={(event) => {
        event.preventDefault();
        triggerRef.current?.focus();
      }} />
    </Dialog>
  );
}
