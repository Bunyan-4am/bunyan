"use client";

import { cn } from "@/lib/utils";
import { PackageOpen, FolderOpen, Search, AlertCircle } from "lucide-react";

const icons = {
  empty: PackageOpen,
  folder: FolderOpen,
  search: Search,
  error: AlertCircle,
};

export function EmptyState({
  icon = "empty",
  title = "No data found",
  description = "There's nothing here yet.",
  action,
  className,
}) {
  const Icon = icons[icon] || icons.empty;

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
      <p className="text-sm text-muted max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle size={28} className="text-danger" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
      {description && <p className="text-sm text-muted max-w-sm">{description}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
