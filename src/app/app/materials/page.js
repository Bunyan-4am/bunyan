"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useCartStore } from "@/store/useStore";
import { mockMaterials } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  BadgeCheck,
  Leaf,
  X,
  Package,
  Scale,
} from "lucide-react";

const categories = ["All", "Steel", "Concrete", "Insulation", "Glass", "Blocks"];

function EcoScoreBadge({ score }) {
  const color = score >= 90 ? "text-emerald-600 bg-emerald-50" : score >= 80 ? "text-accent bg-accent/10" : "text-amber-600 bg-amber-50";
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <Leaf size={10} />
      {score}/100
    </div>
  );
}

function ComparePanel({ items, onClear }) {
  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-border/50 rounded-2xl shadow-2xl p-4 w-[90vw] max-w-3xl"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Scale size={16} className="text-accent" />
          <span className="text-sm font-semibold text-primary">Compare ({items.length}/3)</span>
        </div>
        <button onClick={onClear} className="text-xs text-muted hover:text-danger transition-colors">
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.id} className="p-3 bg-background rounded-xl">
            <p className="text-xs font-medium text-primary truncate">{item.name}</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">Price</span>
                <span className="font-medium text-primary">{formatCurrency(item.price)}/{item.unit}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">Eco Score</span>
                <span className="font-medium text-accent">{item.eco_score}/100</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">CO₂</span>
                <span className="font-medium text-primary">{item.co2_footprint} kg/unit</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">Recycled</span>
                <span className="font-medium text-primary">{item.recycled_content}%</span>
              </div>
            </div>
          </div>
        ))}
        {Array.from({ length: 3 - items.length }).map((_, i) => (
          <div key={`empty-${i}`} className="p-3 bg-background/50 rounded-xl border-2 border-dashed border-border/30 flex items-center justify-center">
            <span className="text-[10px] text-muted">Add to compare</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CartSidebar({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-primary" />
                <h2 className="text-lg font-semibold text-primary">Cart ({items.length})</h2>
              </div>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-muted">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <EmptyState icon="empty" title="Cart is empty" description="Add materials from the marketplace" />
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-border/50">
                      <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0">
                        <Package size={18} className="text-accent/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                        <p className="text-xs text-muted">{formatCurrency(item.price)}/{item.unit}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 rounded-md border border-border/50 flex items-center justify-center text-muted hover:text-primary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium text-primary w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md border border-border/50 flex items-center justify-center text-muted hover:text-primary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 text-muted hover:text-danger transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border/50 bg-background">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-muted">Total</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(total)}</span>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
                <button onClick={clearCart} className="w-full mt-2 text-xs text-muted hover:text-danger text-center py-2 transition-colors">
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function MaterialsMarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("eco_score");
  const [showCart, setShowCart] = useState(false);
  const { addItem, items: cartItems, toggleCompare, compareList, clearCompare } = useCartStore();

  const filteredMaterials = useMemo(() => {
    let result = [...mockMaterials];

    if (category !== "All") {
      result = result.filter((m) => m.category === category);
    }
    if (search) {
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.supplier_name.toLowerCase().includes(search.toLowerCase()) ||
          m.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortBy === "eco_score") return b.eco_score - a.eco_score;
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [category, search, sortBy]);

  return (
    <PageTransition>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package size={28} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Building Materials</h1>
          </div>
          <p className="text-sm text-secondary">Eco-certified construction materials from verified suppliers</p>
        </div>
        <Button variant="outline" onClick={() => setShowCart(true)} className="relative">
          <ShoppingCart size={16} />
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 h-9 px-3 w-64 bg-white rounded-lg border border-border/50">
          <Search size={16} className="text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials, suppliers..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/60 outline-none"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-1 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                category === cat
                  ? "bg-primary text-white"
                  : "bg-white border border-border/50 text-secondary hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-9 px-3 rounded-lg bg-white border border-border/50 text-xs text-secondary outline-none"
        >
          <option value="eco_score">Eco Score (High)</option>
          <option value="price_low">Price (Low → High)</option>
          <option value="price_high">Price (High → Low)</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <EmptyState
          icon="search"
          title="No materials found"
          description="Try adjusting your search or filters"
        />
      ) : (
        <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredMaterials.map((material) => {
            const isInCompare = compareList.some((c) => c.id === material.id);
            return (
              <StaggerItem key={material.id}>
                <Card hover className="overflow-hidden">
                  {/* Image placeholder */}
                  <div className="h-36 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
                    <Package size={36} className="text-primary/20" />
                    {material.verified && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="accent" className="gap-1">
                          <BadgeCheck size={10} /> Verified
                        </Badge>
                      </div>
                    )}
                    {!material.in_stock && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="warning">Out of Stock</Badge>
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompare(material); }}
                      className={cn(
                        "absolute bottom-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                        isInCompare
                          ? "bg-accent text-white shadow-lg shadow-accent/30"
                          : "bg-white/80 backdrop-blur-sm text-muted hover:text-accent border border-border/50"
                      )}
                    >
                      <Scale size={14} />
                    </button>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-semibold text-primary line-clamp-1">{material.name}</p>
                        <p className="text-xs text-muted mt-0.5">{material.supplier_name}</p>
                      </div>
                      <EcoScoreBadge score={material.eco_score} />
                    </div>

                    <p className="text-xs text-secondary line-clamp-2 mb-3">{material.description}</p>

                    {/* Specs */}
                    <div className="flex gap-3 text-[10px] text-muted mb-3">
                      <span>CO₂: {material.co2_footprint} kg</span>
                      <span>Recycled: {material.recycled_content}%</span>
                    </div>

                    {material.certification && (
                      <Badge variant="outline" className="text-[10px] mb-3">
                        {material.certification}
                      </Badge>
                    )}

                    <div className="flex items-end justify-between pt-3 border-t border-border/30">
                      <div>
                        <p className="text-lg font-bold text-primary">{formatCurrency(material.price)}</p>
                        <p className="text-[10px] text-muted">per {material.unit}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="accent"
                        onClick={(e) => { e.stopPropagation(); addItem(material); }}
                        disabled={!material.in_stock}
                      >
                        <Plus size={14} /> Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}

      <AnimatePresence>
        <ComparePanel items={compareList} onClear={clearCompare} />
      </AnimatePresence>

      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </PageTransition>
  );
}
