"use client";
import { Dialog } from 'radix-ui';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
export function ProductModal({ name, slug, children }: { name: string; slug: string; children: ReactNode }) {
 const router = useRouter();
 return (
  <Dialog.Root open onOpenChange={open => { if (!open) router.back(); }}>
   <Dialog.Portal>
    <Dialog.Overlay className="overlay"/>
    <Dialog.Content className="dialog" onCloseAutoFocus={event => { event.preventDefault(); requestAnimationFrame(() => document.getElementById(`product-${slug}`)?.focus()); }}>
     <Dialog.Close className="dialog-close">Close details</Dialog.Close>
     <Dialog.Title>{name}</Dialog.Title>
     <Dialog.Description>Product details. Close this dialog to return to your catalog view.</Dialog.Description>
     {children}
    </Dialog.Content>
   </Dialog.Portal>
  </Dialog.Root>
 );
}
