"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = 24, className }) {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-accent", className)}
    />
  );
}

export function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <LoadingSpinner size={40} />
      <p className="text-sm text-muted animate-pulse">{message}</p>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl border border-border/50 p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
    </div>
  );
}
