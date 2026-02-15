"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/ui/animations";
import { useChatStore } from "@/store/useStore";
import { formatCurrency } from "@/lib/utils";
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  BarChart3,
  Leaf,
  Package,
  Image as ImageIcon,
  Zap,
  X,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Recycle,
  AlertCircle,
} from "lucide-react";

// Structured AI response types
function ProductCards({ data }) {
  return (
    <div className="grid gap-3">
      {data.map((product, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4 p-3 bg-white rounded-xl border border-border/50 hover:border-accent/30 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary">{product.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted">{product.supplier}</span>
              <Badge variant="success" className="text-[10px]">Eco: {product.ecoScore}/100</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-primary">{formatCurrency(product.price)}</p>
            <p className="text-[10px] text-muted">per {product.unit}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BillComparison({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-3 text-xs font-medium text-muted">Item</th>
            <th className="text-right py-2 px-3 text-xs font-medium text-muted">Current</th>
            <th className="text-right py-2 px-3 text-xs font-medium text-muted">Optimized</th>
            <th className="text-right py-2 px-3 text-xs font-medium text-muted">Savings</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-border/30 last:border-0">
              <td className="py-2 px-3 text-primary">{row.item}</td>
              <td className="py-2 px-3 text-right text-muted">{formatCurrency(row.current)}</td>
              <td className="py-2 px-3 text-right text-accent font-medium">{formatCurrency(row.optimized)}</td>
              <td className="py-2 px-3 text-right text-emerald-600 font-medium">-{formatCurrency(row.savings)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-accent/5">
            <td className="py-2 px-3 font-medium text-primary">Total Savings</td>
            <td colSpan="2"></td>
            <td className="py-2 px-3 text-right text-accent font-bold">
              -{formatCurrency(data.reduce((s, r) => s + r.savings, 0))}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function CostBreakdown({ data }) {
  const total = data.reduce((s, d) => s + d.amount, 0);
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-primary">{item.category}</span>
            <span className="text-sm font-medium text-primary">{formatCurrency(item.amount)}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(item.amount / total) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
      <div className="pt-2 border-t border-border/50 flex justify-between">
        <span className="text-sm font-medium text-primary">Total</span>
        <span className="text-sm font-bold text-primary">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

function SustainabilityScoreCard({ data }) {
  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <motion.circle
            cx="50" cy="50" r="40" fill="none" stroke="#2e8c58" strokeWidth="10"
            strokeLinecap="round" strokeDasharray={251}
            initial={{ strokeDashoffset: 251 }}
            animate={{ strokeDashoffset: 251 - (data.score / 100) * 251 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-primary">{data.score}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-primary">{data.rating}</p>
      <p className="text-xs text-muted mt-1">{data.description}</p>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.metrics.map((m, i) => (
          <div key={i} className="p-2 bg-accent/5 rounded-lg">
            <p className="text-xs font-bold text-primary">{m.value}</p>
            <p className="text-[10px] text-muted">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignPreview({ data }) {
  return (
    <div className="space-y-3">
      <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border/50 flex items-center justify-center">
        <div className="text-center">
          <ImageIcon size={40} className="text-muted mx-auto mb-2" />
          <p className="text-sm text-muted">{data.title}</p>
          <p className="text-xs text-muted/60 mt-1">AI-generated design preview</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {data.specs.map((spec, i) => (
          <div key={i} className="p-2 bg-background rounded-lg text-center">
            <p className="text-xs font-medium text-primary">{spec.value}</p>
            <p className="text-[10px] text-muted">{spec.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simulated AI responses
const aiResponses = {
  default: {
    type: "text",
    content: "I'm Bunyan AI, your construction intelligence assistant. I can help you with:\n\n• **Cost Analysis** — Scan and compare bills\n• **Material Sourcing** — Find eco-friendly alternatives\n• **Sustainability Reports** — Track environmental impact\n• **Design Optimization** — AI-generated eco-designs\n\nWhat would you like to explore?",
  },
  materials: {
    type: "products",
    content: "I found 3 eco-certified alternatives for your steel rebar requirement. All verified suppliers with sustainability certifications:",
    data: [
      { name: "EcoSteel Rebar Grade 60", supplier: "GreenSteel Arabia", price: 3200, unit: "ton", ecoScore: 92 },
      { name: "RecyBar Premium HR500", supplier: "Arabian Steel Co.", price: 3450, unit: "ton", ecoScore: 88 },
      { name: "GreenForce Rebar G60", supplier: "Emirates Steel", price: 3100, unit: "ton", ecoScore: 85 },
    ],
  },
  bill: {
    type: "comparison",
    content: "I've analyzed your bill and found potential optimizations by switching to eco-certified alternatives:",
    data: [
      { item: "Steel Rebar", current: 384000, optimized: 342000, savings: 42000 },
      { item: "Concrete Mix", current: 225000, optimized: 198000, savings: 27000 },
      { item: "Insulation", current: 156000, optimized: 139000, savings: 17000 },
      { item: "Glass Panels", current: 89000, optimized: 81000, savings: 8000 },
    ],
  },
  cost: {
    type: "breakdown",
    content: "Here's the cost breakdown analysis for your King Abdullah Tower B project:",
    data: [
      { category: "Structural Materials", amount: 4200000, color: "#102a4e" },
      { category: "MEP Systems", amount: 1850000, color: "#2e8c58" },
      { category: "Finishing", amount: 1200000, color: "#3b82f6" },
      { category: "Labor", amount: 950000, color: "#f59e0b" },
      { category: "Equipment Rental", amount: 550000, color: "#788593" },
    ],
  },
  sustainability: {
    type: "score",
    content: "Sustainability assessment complete for your New Capital Residential Complex Phase 2:",
    data: {
      score: 94,
      rating: "Exceptional",
      description: "Top 5% of projects in the region for environmental compliance",
      metrics: [
        { label: "CO₂ Saved", value: "890t" },
        { label: "Waste ↓", value: "2.8%" },
        { label: "Recycled", value: "72%" },
      ],
    },
  },
  design: {
    type: "design",
    content: "I've generated an optimized design preview based on your requirements with sustainable materials:",
    data: {
      title: "Eco-Optimized Facade Design",
      specs: [
        { label: "Energy Rating", value: "A+" },
        { label: "Solar Gain", value: "-35%" },
        { label: "Material Cost", value: "EGP 890/m\u00b2" },
        { label: "CO₂ Impact", value: "-42%" },
      ],
    },
  },
};

function getAIResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes("material") || lower.includes("steel") || lower.includes("concrete") || lower.includes("find")) {
    return aiResponses.materials;
  }
  if (lower.includes("bill") || lower.includes("invoice") || lower.includes("scan") || lower.includes("compare")) {
    return aiResponses.bill;
  }
  if (lower.includes("cost") || lower.includes("budget") || lower.includes("breakdown") || lower.includes("spend")) {
    return aiResponses.cost;
  }
  if (lower.includes("sustain") || lower.includes("eco") || lower.includes("green") || lower.includes("environment")) {
    return aiResponses.sustainability;
  }
  if (lower.includes("design") || lower.includes("generate") || lower.includes("preview") || lower.includes("facade")) {
    return aiResponses.design;
  }
  return aiResponses.default;
}

const quickPrompts = [
  { label: "Find eco materials", icon: Leaf },
  { label: "Scan my bill", icon: FileText },
  { label: "Cost breakdown", icon: DollarSign },
  { label: "Sustainability report", icon: Recycle },
  { label: "Generate design", icon: ImageIcon },
  { label: "Optimize budget", icon: TrendingDown },
];

export default function AICenterPage() {
  const { messages, addMessage, isTyping, setTyping, activePanel, setActivePanel, clearChat } = useChatStore();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const message = text || input.trim();
    if (!message) return;

    // Add user message
    addMessage({ role: "user", content: message, timestamp: Date.now() });
    setInput("");
    setTyping(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const response = getAIResponse(message);
    addMessage({
      role: "assistant",
      content: response.content,
      type: response.type,
      data: response.data,
      timestamp: Date.now(),
    });

    if (response.type !== "text") {
      setActivePanel(response);
    }
    setTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageTransition>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">AI Control Center</h1>
          <p className="text-sm text-secondary mt-1">Chat with Bunyan AI to analyze, optimize, and discover.</p>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat}>
            <X size={14} /> Clear
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-180px)]">
        {/* Chat Panel */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <Sparkles size={28} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Bunyan AI</h3>
                <p className="text-sm text-muted mt-1 max-w-xs">
                  Ask me about materials, bills, costs, sustainability, or design optimization.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-6 w-full">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt.label}
                      onClick={() => handleSend(prompt.label)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all text-left group"
                    >
                      <prompt.icon size={14} className="text-muted group-hover:text-accent transition-colors" />
                      <span className="text-xs text-secondary group-hover:text-primary transition-colors">{prompt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" ? "bg-primary text-white" : "bg-accent/10 text-accent"
                }`}>
                  {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-2xl rounded-tr-md px-4 py-2.5"
                    : "bg-background rounded-2xl rounded-tl-md px-4 py-2.5"
                }`}>
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" ? "text-white" : "text-primary"
                  }`}>
                    {msg.content}
                  </p>
                  {msg.type && msg.type !== "text" && (
                    <button
                      onClick={() => setActivePanel({ type: msg.type, data: msg.data })}
                      className="mt-2 text-xs text-accent font-medium flex items-center gap-1 hover:text-accent-dark transition-colors"
                    >
                      View details <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Bot size={14} className="text-accent" />
                </div>
                <div className="bg-background rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/50">
            <div className="flex items-center gap-2 bg-background rounded-xl p-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Bunyan AI..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted/60 outline-none"
              />
              <Button
                size="icon"
                variant="accent"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-lg"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Rendering Panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {!activePanel ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-8"
              >
                <div className="w-20 h-20 rounded-2xl bg-background flex items-center justify-center mb-4">
                  <Zap size={32} className="text-muted" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Dynamic Insights Panel</h3>
                <p className="text-sm text-muted mt-2 max-w-sm">
                  AI responses will render interactively here — product comparisons, charts, design previews, and more.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activePanel.type}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Sparkles size={16} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-primary">
                          {activePanel.type === "products" && "Material Recommendations"}
                          {activePanel.type === "comparison" && "Bill Comparison Analysis"}
                          {activePanel.type === "breakdown" && "Cost Breakdown"}
                          {activePanel.type === "score" && "Sustainability Score"}
                          {activePanel.type === "design" && "Design Preview"}
                        </h3>
                        <p className="text-xs text-muted">AI-generated analysis</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActivePanel(null)}>
                      <X size={14} />
                    </Button>
                  </div>

                  {activePanel.type === "products" && <ProductCards data={activePanel.data} />}
                  {activePanel.type === "comparison" && <BillComparison data={activePanel.data} />}
                  {activePanel.type === "breakdown" && <CostBreakdown data={activePanel.data} />}
                  {activePanel.type === "score" && <SustainabilityScoreCard data={activePanel.data} />}
                  {activePanel.type === "design" && <DesignPreview data={activePanel.data} />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
