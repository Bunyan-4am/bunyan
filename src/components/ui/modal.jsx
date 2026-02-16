"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, description, children, className, size = "md" }) {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 m-0"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col",
              sizes[size],
              className
            )}
          >
            <div className="flex items-start justify-between p-6 pb-2 flex-shrink-0">
              <div>
                {title && <h2 className="text-xl font-semibold text-primary">{title}</h2>}
                {description && (
                  <p className="text-sm text-muted mt-1">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-muted"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 pt-4 overflow-y-auto flex-1 overscroll-contain">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
