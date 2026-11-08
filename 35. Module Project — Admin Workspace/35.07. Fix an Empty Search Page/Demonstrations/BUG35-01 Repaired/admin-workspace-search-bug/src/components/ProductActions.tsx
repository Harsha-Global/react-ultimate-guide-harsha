import { useRef, useState } from "react";
import type { DisplayLocale } from "../displayFormats";
import type { Product } from "../catalog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductDetailsContent } from "./ProductDetails";

export function ProductActions({ product, onEdit, disabled, locale = "en-US" }: { locale?: DisplayLocale; product: Product; onEdit: (trigger: HTMLButtonElement | null) => void; disabled: boolean }) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const pendingAction = useRef<"review" | "edit" | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button id={`product-actions-${product.id}`} disabled={disabled} ref={triggerRef} type="button" variant="outline" size="sm" aria-label={`Actions for ${product.name}`}>
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64 max-w-[calc(100vw-2rem)]" onCloseAutoFocus={(event) => {
          const action = pendingAction.current;
          pendingAction.current = null;
          if (action) {
            event.preventDefault();
            if (action === "review") setReviewOpen(true);
            else onEdit(triggerRef.current);
          }
        }}>
          <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => { pendingAction.current = "review"; }}>
            Review availability
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => { pendingAction.current = "edit"; }}>Edit product</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={product.image} target="_blank" rel="noreferrer">Open product image (new tab)</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductDetailsContent locale={locale} product={product} onCloseAutoFocus={(event) => {
        event.preventDefault();
        triggerRef.current?.focus();
      }} />
    </Dialog>
  );
}
