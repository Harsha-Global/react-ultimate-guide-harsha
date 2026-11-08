import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const actionButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-45",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground enabled:hover:bg-primary-hover",
        outline: "border border-input bg-card text-foreground enabled:hover:bg-muted",
      },
      size: {
        default: "min-h-11 px-4 text-base",
        compact: "min-h-9 px-3 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ActionButtonProps = ComponentProps<"button"> & VariantProps<typeof actionButtonVariants>;

export function ActionButton({ className, variant, size, type = "button", ...props }: ActionButtonProps) {
  return <button type={type} className={cn(actionButtonVariants({ variant, size }), className)} {...props} />;
}
