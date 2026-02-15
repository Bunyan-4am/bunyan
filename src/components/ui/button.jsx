"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-light shadow-sm",
  accent: "bg-accent text-white hover:bg-accent-light shadow-sm",
  outline: "border border-border bg-white text-primary hover:bg-gray-50",
  ghost: "text-primary hover:bg-gray-100",
  danger: "bg-danger text-white hover:bg-red-600 shadow-sm",
  secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
};

const sizes = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-xl",
  icon: "h-10 w-10 rounded-lg",
};

const Button = forwardRef(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
