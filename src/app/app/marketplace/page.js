"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useCartStore } from "@/store/useStore";
import { mockRecycledProducts } from "@/lib/mock-data";
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
  Recycle,
  Sparkles,
  Heart,
  Share2,
  Ruler,
  Weight,
  Award,
  Tag,
  Info,
  Eye,
} from "lucide-react";

const categories = ["All", "Lighting", "Wall Art", "Home Decor", "Office Decor", "Wall Decor", "Organization"];

function EcoScoreBadge({ score }) {
  const color = score >= 95 ? "text-emerald-600 bg-emerald-50" : score >= 90 ? "text-accent bg-accent/10" : "text-amber-600 bg-amber-50";
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <Recycle size={10} />
      {score}% Eco
    </div>
  );
}

function ProductDetailModal({ product, isOpen, onClose }) {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="space-y-6">
        {/* Product Image */}
        {product.image_url ? (
          <div className="relative w-full h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl overflow-hidden">
            <Image 
              src={product.image_url} 
              alt={product.name}
              fill
              className="object-contain p-4"
            />
            {product.handmade && (
              <div className="absolute top-3 left-3">
                <Badge variant="accent" className="gap-1">
                  <Sparkles size={10} /> Handmade
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center">
            <Package size={48} className="text-primary/20" />
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between p-4 bg-background rounded-xl">
          <div>
            <p className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
            <p className="text-xs text-muted">per {product.unit}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Heart size={14} /> Save
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Share2 size={14} /> Share
            </Button>
          </div>
        </div>

        {/* Eco Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <Recycle size={14} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-900">Recycled Content</span>
            </div>
            <p className="text-2xl font-bold text-emerald-700">{product.recycled_content}%</p>
          </div>
          <div className="p-3 bg-accent/5 rounded-xl border border-accent/20">
            <div className="flex items-center gap-2 mb-1">
              <Leaf size={14} className="text-accent" />
              <span className="text-xs font-medium text-accent">Eco Score</span>
            </div>
            <p className="text-2xl font-bold text-accent">{product.eco_score}/100</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
            <Info size={14} /> About This Product
          </h3>
          <p className="text-sm text-secondary leading-relaxed">{product.description}</p>
        </div>

        {/* Materials Source */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <h4 className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1.5">
            <Recycle size={12} /> Materials Source
          </h4>
          <p className="text-xs text-amber-800">{product.materials_source}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="text-sm font-bold text-primary mb-3">Specifications</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Ruler size={14} className="text-muted" />
              <div>
                <div className="text-muted">Dimensions</div>
                <div className="font-medium text-primary">{product.dimensions}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Weight size={14} className="text-muted" />
              <div>
                <div className="text-muted">Weight</div>
                <div className="font-medium text-primary">{product.weight}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-primary mb-3">Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-primary mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="flex items-center gap-1 text-[10px] font-medium text-muted bg-background px-2 py-1 rounded-full border border-border/30">
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Creator */}
        <div className="p-4 bg-background rounded-xl border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Created By</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary">{product.creator_name}</span>
                {product.verified && <BadgeCheck size={14} className="text-accent" />}
              </div>
              {product.certification && (
                <Badge variant="outline" className="text-[10px] mt-2">
                  <Award size={9} className="mr-1" /> {product.certification}
                </Badge>
              )}
            </div>
            <Button size="sm" variant="outline">Contact Creator</Button>
          </div>
        </div>

        {/* Add to Cart */}
        <Button className="w-full gap-2" size="lg">
          <Plus size={16} /> Add to Cart
        </Button>
      </div>
    </Modal>
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

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("eco_score");
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem, items: cartItems } = useCartStore();

  const filteredProducts = useMemo(() => {
    let result = [...mockRecycledProducts];

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.creator_name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
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
            <Recycle size={28} className="text-accent" />
            <h1 className="text-2xl font-bold text-primary">Recycled Marketplace</h1>
          </div>
          <p className="text-sm text-secondary">Handmade products from upcycled construction materials</p>
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

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-primary mb-1">Supporting Circular Economy</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Every product is handcrafted by local Egyptian artisans using salvaged materials from construction sites. 
              Your purchase reduces waste, supports sustainable practices, and brings unique art into your space.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 h-9 px-3 w-64 bg-white rounded-lg border border-border/50">
          <Search size={16} className="text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, creators, tags..."
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
                  ? "bg-accent text-white"
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

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon="search"
          title="No products found"
          description="Try adjusting your search or filters"
        />
      ) : (
        <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <Card hover className="overflow-hidden group">
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                  {product.image_url ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={product.image_url} 
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={40} className="text-primary/20" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.verified && (
                      <Badge variant="accent" className="gap-1">
                        <BadgeCheck size={10} /> Verified
                      </Badge>
                    )}
                    {product.handmade && (
                      <Badge className="gap-1 bg-primary text-white">
                        <Sparkles size={10} /> Handmade
                      </Badge>
                    )}
                  </div>

                  {!product.in_stock && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="warning">Sold Out</Badge>
                    </div>
                  )}

                  {/* Quick View Button */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                  >
                    <Eye size={16} className="text-primary" />
                  </button>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted mt-0.5">{product.creator_name}</p>
                    </div>
                    <EcoScoreBadge score={product.eco_score} />
                  </div>

                  <p className="text-xs text-secondary line-clamp-2 mb-3">{product.description}</p>

                  {/* Recycled Content Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Recycle size={9} /> {product.recycled_content}% Recycled
                    </div>
                    {product.customizable && (
                      <Badge variant="outline" className="text-[10px]">Customizable</Badge>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[9px] text-muted bg-background px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end justify-between pt-3 border-t border-border/30">
                    <div>
                      <p className="text-lg font-bold text-primary">{formatCurrency(product.price)}</p>
                      <p className="text-[10px] text-muted">per {product.unit}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={(e) => { e.stopPropagation(); addItem(product); }}
                      disabled={!product.in_stock}
                    >
                      <Plus size={14} /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </PageTransition>
  );
}
