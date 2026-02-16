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
  Upload,
  Paperclip,
  File,
  CheckCircle2,
  Wand2,
  ArrowLeftRight,
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
  // Support both old format ({item, current, optimized, savings}) and new API format ({item, invoice_price, market_price, difference})
  const items = data.items || data;
  const summary = data.summary || null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-3 text-xs font-medium text-muted">Item</th>
            <th className="text-center py-2 px-3 text-xs font-medium text-muted">Qty</th>
            <th className="text-right py-2 px-3 text-xs font-medium text-muted">Invoice</th>
            <th className="text-right py-2 px-3 text-xs font-medium text-muted">Market</th>
            <th className="text-right py-2 px-3 text-xs font-medium text-muted">Savings</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => {
            const itemName = row.item || row.description;
            const qty = row.quantity || '';
            const invoicePrice = row.invoice_price ?? row.current ?? 0;
            const marketPrice = row.market_price ?? row.optimized ?? 0;
            const diff = row.difference ?? row.savings ?? (invoicePrice - marketPrice);

            return (
              <tr key={i} className="border-b border-border/30 last:border-0">
                <td className="py-2 px-3 text-primary">{itemName}</td>
                <td className="py-2 px-3 text-center text-muted">{qty}</td>
                <td className="py-2 px-3 text-right text-muted">{formatCurrency(invoicePrice)}</td>
                <td className="py-2 px-3 text-right text-accent font-medium">{formatCurrency(marketPrice)}</td>
                <td className="py-2 px-3 text-right text-emerald-600 font-medium">-{formatCurrency(diff)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-accent/5">
            <td colSpan="2" className="py-2 px-3 font-medium text-primary">Total Savings</td>
            <td className="py-2 px-3 text-right font-medium text-muted">
              {summary ? formatCurrency(summary.total_invoice) : ''}
            </td>
            <td className="py-2 px-3 text-right font-medium text-accent">
              {summary ? formatCurrency(summary.total_market_estimated) : ''}
            </td>
            <td className="py-2 px-3 text-right text-accent font-bold">
              -{formatCurrency(summary ? summary.potential_savings : items.reduce((s, r) => s + (r.difference ?? r.savings ?? 0), 0))}
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
      {data.imageUrl ? (
        <div className="aspect-video rounded-xl border border-border/50 overflow-hidden">
          <img 
            src={data.imageUrl} 
            alt={data.title || "AI Design"} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
              e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center"><div class="text-center"><svg class="w-10 h-10 text-muted mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg><p class="text-sm text-muted">Design Image Loading...</p></div></div>`;
            }}
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border/50 flex items-center justify-center">
          <div className="text-center">
            <ImageIcon size={40} className="text-muted mx-auto mb-2" />
            <p className="text-sm text-muted">{data.title}</p>
            <p className="text-xs text-muted/60 mt-1">AI-generated design preview</p>
          </div>
        </div>
      )}
      {data.specs && (
        <div className="grid grid-cols-2 gap-2">
          {data.specs.map((spec, i) => (
            <div key={i} className="p-2 bg-background rounded-lg text-center">
              <p className="text-xs font-medium text-primary">{spec.value}</p>
              <p className="text-[10px] text-muted">{spec.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Image Display Component for AI responses with images
function ImageResponse({ imageUrl, caption }) {
  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-border/50 overflow-hidden max-w-md">
        <img 
          src={imageUrl} 
          alt={caption || "AI Generated"} 
          className="w-full h-auto"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      {caption && (
        <p className="text-xs text-muted italic">{caption}</p>
      )}
    </div>
  );
}

// Before/After Finishing Visualization Component
function BeforeAfterVisualization({ data }) {
  const [showAfter, setShowAfter] = useState(true);
  
  return (
    <div className="space-y-4">
      {/* Image Comparison */}
      <div className="relative">
        <div className="aspect-video rounded-xl border border-border/50 overflow-hidden bg-background">
          <img 
            src={data.afterImage} 
            alt="After Finishing" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
            }}
          />
        </div>
        
        {/* Toggle Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-border/50">
          <span className="text-xs font-medium text-primary">After Finishing</span>
          <Badge variant="success" className="text-[10px]">
            {data.style || 'Modern'} Style
          </Badge>
        </div>
      </div>

      {/* Analysis Info */}
      {data.analysis && (
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-background rounded-lg">
            <p className="text-xs text-muted">Room Type</p>
            <p className="text-sm font-medium text-primary">{data.analysis.roomType || 'Space'}</p>
          </div>
          <div className="p-3 bg-background rounded-lg">
            <p className="text-xs text-muted">Est. Timeline</p>
            <p className="text-sm font-medium text-primary">{data.timeline || '3-4 weeks'}</p>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {data.suggestions && data.suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Finishing Recommendations:</p>
          {data.suggestions.map((suggestion, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 bg-accent/5 rounded-lg border border-accent/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">{suggestion.title}</p>
                  <p className="text-xs text-muted mt-0.5">{suggestion.description}</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  {suggestion.cost}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Materials List */}
      {data.materials && data.materials.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Required Materials:</p>
          <div className="grid gap-2">
            {data.materials.slice(0, 4).map((material, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-border/30">
                <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center shrink-0">
                  <Package size={14} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-primary truncate">{material.name}</p>
                  <p className="text-[10px] text-muted">{material.quantity} {material.unit} • {material.supplier}</p>
                </div>
                <Badge variant="success" className="text-[9px]">
                  {material.ecoScore}/100
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
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
  // This is now just a fallback - real responses come from API
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
  { label: "Find eco materials for my project", icon: Leaf },
  { label: "Analyze uploaded bill for savings", icon: FileText, special: "bill" },
  { label: "Show cost breakdown and optimization", icon: DollarSign },
  { label: "Generate sustainability report", icon: Recycle },
  { label: "Create eco-friendly design with image", icon: ImageIcon },
  { label: "Transform room: Before → After finishing", icon: Wand2, special: "finishing" },
];

export default function AICenterPage() {
  const { messages, addMessage, isTyping, setTyping, activePanel, setActivePanel, clearChat } = useChatStore();
  const [input, setInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showFinishingModal, setShowFinishingModal] = useState(false);
  const [finishingImage, setFinishingImage] = useState(null);
  const [finishingStyle, setFinishingStyle] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingBillUpload, setPendingBillUpload] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const finishingInputRef = useRef(null);
  const billInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isPDF = file.type === 'application/pdf';
      const isSmall = file.size <= 10 * 1024 * 1024; // 10MB limit
      return (isImage || isPDF) && isSmall;
    });

    if (validFiles.length > 0) {
      setIsUploading(true);
      const fileData = await Promise.all(
        validFiles.map(async (file) => {
          const preview = file.type.startsWith('image/') 
            ? URL.createObjectURL(file) 
            : null;
          return {
            file,
            name: file.name,
            type: file.type,
            size: file.size,
            preview,
          };
        })
      );
      setUploadedFiles(prev => [...prev, ...fileData]);
      setIsUploading(false);
    }
    e.target.value = ''; // Reset input
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (text) => {
    const message = text || input.trim();
    if (!message && uploadedFiles.length === 0) return;

    // Prepare message content
    let userMessage = message || "Please analyze this file";
    
    // Add user message with files
    const userMsg = {
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
      files: uploadedFiles.map(f => ({ name: f.name, type: f.type, preview: f.preview })),
    };
    addMessage(userMsg);
    
    setInput("");
    setTyping(true);

    try {
      let response;

      // If files are uploaded, handle file analysis
      if (uploadedFiles.length > 0) {
        const file = uploadedFiles[0]; // Process first file
        
        if (file.type.startsWith('image/')) {
          // For images, use Gemini Vision via scan-bill or chat API
          const formData = new FormData();
          formData.append('file', file.file);

          if (message.toLowerCase().includes('bill') || message.toLowerCase().includes('invoice') || message.toLowerCase().includes('analyze') || message.toLowerCase().includes('savings') || !message) {
            // Send to invoice analysis endpoint
            const res = await fetch('/api/scan-bill', {
              method: 'POST',
              body: formData,
            });
            const data = await res.json();
            
            if (data.success && data.marketplace_analysis) {
              // New API response format
              const analysis = data.marketplace_analysis;
              const summary = analysis.summary;
              const itemCount = analysis.items_analysis?.length || 0;
              
              response = {
                type: 'comparison',
                content: `✅ **Invoice Analyzed Successfully**\n\n📋 **${itemCount} items** found in your invoice\n💰 Total Invoice: **${formatCurrency(summary?.total_invoice || 0)}**\n🏷️ Market Estimate: **${formatCurrency(summary?.total_market_estimated || 0)}**\n💚 Potential Savings: **${formatCurrency(summary?.potential_savings || 0)}**\n\nHere's the detailed comparison:`,
                data: {
                  items: analysis.items_analysis || [],
                  summary: summary,
                },
              };
            } else if (data.error) {
              response = {
                type: 'text',
                content: `❌ **Analysis Failed**\n\n${data.error}. Please try uploading a clearer image of the invoice.`,
              };
            } else {
              // Fallback for unexpected format
              response = {
                type: 'text',
                content: `✅ **Analysis Complete**\n\n${JSON.stringify(data, null, 2)}`,
              };
            }
          } else {
            // General image analysis via chat API with vision
            const reader = new FileReader();
            const base64Promise = new Promise((resolve) => {
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(file.file);
            });
            const base64 = await base64Promise;
            
            const res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                message: `${message}\n\n[Image uploaded: ${file.name}]`,
                context: { hasImage: true, imageType: file.type },
              }),
            });
            response = await res.json();
          }
        } else if (file.type === 'application/pdf') {
          // PDF handling - describe it and get AI response
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: `${message}\n\n[PDF uploaded: ${file.name}]\n\nPlease provide construction consultation for this PDF document.`,
              context: { hasPDF: true, fileName: file.name },
            }),
          });
          response = await res.json();
        }
        
        // Clear uploaded files after processing
        setUploadedFiles([]);
      } else {
        // Text-only message - send to chat API
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        });
        response = await res.json();
      }

      // Add AI response
      addMessage({
        role: "assistant",
        content: response.content || "Analysis complete.",
        type: response.type,
        data: response.data,
        timestamp: Date.now(),
      });

      if (response.type !== "text") {
        setActivePanel(response);
      }
    } catch (error) {
      console.error('AI request failed:', error);
      // Fallback to mock response
      const fallbackResponse = getAIResponse(message);
      addMessage({
        role: "assistant",
        content: fallbackResponse.content + "\n\n_Using demo mode - check API configuration._",
        type: fallbackResponse.type,
        data: fallbackResponse.data,
        timestamp: Date.now(),
      });
      if (fallbackResponse.type !== "text") {
        setActivePanel(fallbackResponse);
      }
    }

    setTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Direct bill/invoice upload handler
  const handleBillUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setTyping(true);

    // Show user message with file preview
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    addMessage({
      role: "user",
      content: "Analyze this invoice for savings",
      files: [{ name: file.name, type: file.type, preview }],
      timestamp: Date.now(),
    });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/scan-bill', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.marketplace_analysis) {
        const analysis = data.marketplace_analysis;
        const summary = analysis.summary;
        const itemCount = analysis.items_analysis?.length || 0;

        const response = {
          type: 'comparison',
          content: `✅ **Invoice Analyzed Successfully**\n\n📋 **${itemCount} items** found in your invoice\n💰 Total Invoice: **${formatCurrency(summary?.total_invoice || 0)}**\n🏷️ Market Estimate: **${formatCurrency(summary?.total_market_estimated || 0)}**\n💚 Potential Savings: **${formatCurrency(summary?.potential_savings || 0)}**\n\nHere's the detailed comparison:`,
          data: {
            items: analysis.items_analysis || [],
            summary: summary,
          },
        };

        addMessage({
          role: "assistant",
          content: response.content,
          type: response.type,
          data: response.data,
          timestamp: Date.now(),
        });
        setActivePanel(response);
      } else {
        addMessage({
          role: "assistant",
          content: `❌ **Analysis Failed**\n\n${data.error || 'Could not analyze this file'}. Please try a clearer image.`,
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error('Bill analysis error:', error);
      addMessage({
        role: "assistant",
        content: "عذراً، حدث خطأ في تحليل الفاتورة. جرب مرة تانية.",
        timestamp: Date.now(),
      });
    }

    setTyping(false);
  };

  const handleFinishingVisualization = async () => {
    if (!finishingImage) return;

    setShowFinishingModal(false);
    setIsGenerating(true);
    setTyping(true);

    // Add user message
    addMessage({
      role: "user",
      content: `Show me how this room would look after ${finishingStyle} finishing`,
      files: [{ name: finishingImage.name, type: finishingImage.type, preview: URL.createObjectURL(finishingImage) }],
      timestamp: Date.now(),
    });

    try {
      // Endpoint 1: Image generation (friend's API)
      const formData = new FormData();
      formData.append('file', finishingImage);
      formData.append('style', finishingStyle);

      const [imageRes, dataRes] = await Promise.all([
        fetch('/api/visualize-finishing', {
          method: 'POST',
          body: formData,
        }),
        // Endpoint 2: Finishing data (materials, costs, etc.)
        fetch('/api/finishing-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ style: finishingStyle }),
        }),
      ]);

      const imageResult = await imageRes.json();
      const dataResult = await dataRes.json();

      console.log('Image API result:', imageResult);
      console.log('Data API result:', dataResult);

      if (imageResult.success && imageResult.generated_image_url) {
        // Combine: image from endpoint 1, data from endpoint 2
        const combined = {
          ...dataResult,
          afterImage: imageResult.generated_image_url,
          style: finishingStyle,
        };

        addMessage({
          role: "assistant",
          content: `✨ **${finishingStyle.charAt(0).toUpperCase() + finishingStyle.slice(1)} Finishing Visualization**\n\nI've transformed your unfinished space into a professional ${finishingStyle} style design.\n\nEstimated Timeline: ${dataResult.timeline || '3-4 weeks'}\nStyle: ${finishingStyle}`,
          type: "finishing",
          data: combined,
          timestamp: Date.now(),
        });

        setActivePanel({ type: "finishing", data: combined, content: "Finishing Visualization" });
      } else {
        throw new Error(imageResult.error || 'Image generation failed');
      }
    } catch (error) {
      console.error('Finishing visualization error:', error);
      addMessage({
        role: "assistant",
        content: "عذراً، حدث خطأ في توليد الصورة. جرب مرة تانية أو تأكد من جودة الصورة.",
        timestamp: Date.now(),
      });
    }

    setIsGenerating(false);
    setTyping(false);
    setFinishingImage(null);
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
                      onClick={() => {
                        if (prompt.special === 'finishing') {
                          setShowFinishingModal(true);
                        } else if (prompt.special === 'bill') {
                          billInputRef.current?.click();
                        } else {
                          handleSend(prompt.label);
                        }
                      }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left group ${
                        prompt.special 
                          ? 'border-accent bg-accent/5 hover:bg-accent/10' 
                          : 'border-border/50 hover:border-accent/30 hover:bg-accent/5'
                      }`}
                    >
                      <prompt.icon size={14} className={`transition-colors ${
                        prompt.special ? 'text-accent' : 'text-muted group-hover:text-accent'
                      }`} />
                      <span className={`text-xs transition-colors ${
                        prompt.special ? 'text-accent font-medium' : 'text-secondary group-hover:text-primary'
                      }`}>{prompt.label}</span>
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
                  {/* Show uploaded files */}
                  {msg.files && msg.files.length > 0 && (
                    <div className="mb-2 space-y-1">
                      {msg.files.map((file, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs opacity-90">
                          {file.preview ? (
                            <img src={file.preview} alt={file.name} className="w-16 h-16 object-cover rounded" />
                          ) : (
                            <File size={12} />
                          )}
                          <span className="truncate max-w-[150px]">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" ? "text-white" : "text-primary"
                  }`}>
                    {msg.content}
                  </p>
                  {/* Show AI-generated images in chat */}
                  {msg.role === "assistant" && msg.data?.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={msg.data.imageUrl} 
                        alt="AI Generated" 
                        className="rounded-lg max-w-full h-auto border border-white/20"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  )}
                  {msg.type && msg.type !== "text" && (
                    <button
                      onClick={() => setActivePanel({ type: msg.type, data: msg.data, content: msg.content })}
                      className={`mt-2 text-xs font-medium flex items-center gap-1 transition-colors ${
                        msg.role === "user" 
                          ? "text-white/80 hover:text-white" 
                          : "text-accent hover:text-accent-dark"
                      }`}
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
            {/* File Upload Preview */}
            {uploadedFiles.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="relative group">
                    {file.preview ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
                        <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeFile(i)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg border border-border bg-background flex items-center justify-center relative">
                        <FileText size={20} className="text-muted" />
                        <button
                          onClick={() => removeFile(i)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <p className="text-[9px] text-muted mt-0.5 truncate max-w-[64px]">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-2 bg-background rounded-xl p-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,.pdf"
                multiple
                className="hidden"
              />
              {/* Hidden input for bill/invoice upload */}
              <input
                type="file"
                ref={billInputRef}
                onChange={handleBillUpload}
                accept="image/*,.pdf"
                className="hidden"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                disabled={isTyping || isUploading}
                className="w-9 h-9 rounded-lg text-muted hover:text-accent hover:bg-accent/10"
                title="Upload image or PDF"
              >
                <Paperclip size={16} />
              </Button>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={uploadedFiles.length > 0 ? "Add message (optional)..." : "Ask Bunyan AI or upload files..."}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted/60 outline-none"
              />
              <Button
                size="icon"
                variant="accent"
                onClick={() => handleSend()}
                disabled={(!input.trim() && uploadedFiles.length === 0) || isTyping}
                className="w-9 h-9 rounded-lg"
              >
                <Send size={16} />
              </Button>
            </div>
            <p className="text-[10px] text-muted/60 mt-1.5 px-2">
              Upload images or PDFs for AI analysis • Supports bills, blueprints, material specs
            </p>
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
                          {activePanel.type === "finishing" && "Before → After Finishing"}
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
                  {activePanel.type === "finishing" && <BeforeAfterVisualization data={activePanel.data} />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Before/After Finishing Modal */}
      <AnimatePresence>
        {showFinishingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowFinishingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Wand2 size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">Before → After Finishing</h3>
                    <p className="text-xs text-muted">Transform your unfinished space</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFinishingModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Upload Section */}
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Upload Unfinished Room Photo
                  </label>
                  <input
                    ref={finishingInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFinishingImage(file);
                      }
                    }}
                    className="hidden"
                  />
                  <button
                    onClick={() => finishingInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-border/50 rounded-xl p-6 hover:border-accent/50 hover:bg-accent/5 transition-all"
                  >
                    {finishingImage ? (
                      <div className="space-y-2">
                        <img
                          src={URL.createObjectURL(finishingImage)}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <p className="text-sm font-medium text-primary">{finishingImage.name}</p>
                        <p className="text-xs text-accent">Click to change</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={32} className="text-muted" />
                        <p className="text-sm font-medium text-primary">Click to upload image</p>
                        <p className="text-xs text-muted">Before finishing: concrete, bare walls, etc.</p>
                      </div>
                    )}
                  </button>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Select Finishing Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['modern', 'luxury', 'classic'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setFinishingStyle(style)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          finishingStyle === style
                            ? 'border-accent bg-accent/10'
                            : 'border-border/50 hover:border-accent/30'
                        }`}
                      >
                        <p className={`text-sm font-medium capitalize ${
                          finishingStyle === style ? 'text-accent' : 'text-primary'
                        }`}>
                          {style}
                        </p>
                        <p className="text-[10px] text-muted mt-0.5">
                          {style === 'modern' && 'Clean & Contemporary'}
                          {style === 'luxury' && 'Premium & Elegant'}
                          {style === 'classic' && 'Classic Egyptian'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleFinishingVisualization}
                  disabled={!finishingImage || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 size={16} />
                      Generate Finishing Visualization
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted text-center">
                  AI will analyze your space and generate a photorealistic finishing preview
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
