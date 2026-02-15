"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Input = forwardRef(({ className, type = "text", label, error, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
    )}
    <input
      type={type}
      className={cn(
        "w-full h-10 px-3 rounded-lg border bg-white text-sm text-foreground placeholder:text-muted/60 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
        error ? "border-danger" : "border-border",
        className
      )}
      ref={ref}
      {...props}
    />
    {error && <p className="text-xs text-danger mt-1">{error}</p>}
  </div>
));
Input.displayName = "Input";

const Textarea = forwardRef(({ className, label, error, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
    )}
    <textarea
      className={cn(
        "w-full min-h-[100px] px-3 py-2 rounded-lg border bg-white text-sm text-foreground placeholder:text-muted/60 transition-colors resize-none",
        "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
        error ? "border-danger" : "border-border",
        className
      )}
      ref={ref}
      {...props}
    />
    {error && <p className="text-xs text-danger mt-1">{error}</p>}
  </div>
));
Textarea.displayName = "Textarea";

const Select = forwardRef(({ className, label, error, options = [], ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
    )}
    <select
      className={cn(
        "w-full h-10 px-3 rounded-lg border bg-white text-sm text-foreground transition-colors appearance-none",
        "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
        error ? "border-danger" : "border-border",
        className
      )}
      ref={ref}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-danger mt-1">{error}</p>}
  </div>
));
Select.displayName = "Select";

export { Input, Textarea, Select };
