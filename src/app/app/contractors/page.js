"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  HardHat,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  X,
  Building2,
  Leaf,
  DollarSign,
  Eye,
  MessageSquare,
  ChevronRight,
  Clock,
  Shield,
} from "lucide-react";

/* ─────────── Mock Contractors Data ─────────── */
const contractors = [
  {
    id: "c-001",
    name: "Hassan & Partners Construction",
    logo: null,
    initials: "HP",
    gradient: "from-blue-600 to-indigo-700",
    tagline: "Pioneering sustainable mega-projects across Egypt",
    rating: 4.9,
    reviewCount: 127,
    location: "Cairo, Egypt",
    phone: "+20 100 555 1234",
    email: "info@hassanpartners.eg",
    website: "hassanpartners.eg",
    founded: 2008,
    employees: "200-500",
    completedProjects: 85,
    activeProjects: 12,
    specializations: ["Commercial Towers", "Mixed-Use", "Green Buildings"],
    certifications: ["EGBC Gold", "ISO 14001", "ISO 9001"],
    ecoScore: 94,
    avgBudget: "EGP 5M - 50M",
    description:
      "One of Egypt's leading sustainable construction firms. Specializing in large-scale commercial and mixed-use developments with a focus on environmental compliance and LEED standards.",
    portfolio: [
      {
        id: "p-001",
        title: "Cairo Business Park - Tower A",
        image: null,
        category: "Commercial",
        year: 2025,
        budget: "EGP 45M",
        duration: "18 months",
        description: "45-floor commercial tower with LEED Gold certification, featuring solar facade panels and rainwater harvesting systems.",
        ecoScore: 96,
        metrics: { co2Saved: "1,200 tons", wastReduced: "62%", energySaved: "38%" },
      },
      {
        id: "p-002",
        title: "New Capital Residential Complex",
        image: null,
        category: "Residential",
        year: 2024,
        budget: "EGP 28M",
        duration: "14 months",
        description: "Eco-friendly residential compound with 120 units, zero-waste target, and integrated green spaces.",
        ecoScore: 91,
        metrics: { co2Saved: "680 tons", wastReduced: "55%", energySaved: "42%" },
      },
      {
        id: "p-003",
        title: "Smart Village Office Hub",
        image: null,
        category: "Office",
        year: 2024,
        budget: "EGP 18M",
        duration: "10 months",
        description: "Modern co-working space with energy-efficient HVAC, green roof, and IoT-enabled resource monitoring.",
        ecoScore: 89,
        metrics: { co2Saved: "340 tons", wastReduced: "48%", energySaved: "35%" },
      },
    ],
  },
  {
    id: "c-002",
    name: "Nile Green Construction",
    logo: null,
    initials: "NG",
    gradient: "from-accent to-emerald-600",
    tagline: "Building Egypt's green future, one project at a time",
    rating: 4.8,
    reviewCount: 94,
    location: "Alexandria, Egypt",
    phone: "+20 111 222 3456",
    email: "contact@nilegreen.eg",
    website: "nilegreen.eg",
    founded: 2012,
    employees: "100-200",
    completedProjects: 52,
    activeProjects: 8,
    specializations: ["Residential", "Eco-Villages", "Renovations"],
    certifications: ["EGBC Silver", "ISO 14001"],
    ecoScore: 91,
    avgBudget: "EGP 2M - 25M",
    description:
      "Focused exclusively on eco-friendly residential construction. Known for innovative waste management systems and sustainable material sourcing across the Delta region.",
    portfolio: [
      {
        id: "p-004",
        title: "Mediterranean Eco-Village",
        image: null,
        category: "Residential",
        year: 2025,
        budget: "EGP 22M",
        duration: "16 months",
        description: "60-unit eco-village in North Coast with solar power, composting systems, and native landscaping.",
        ecoScore: 93,
        metrics: { co2Saved: "520 tons", wastReduced: "70%", energySaved: "50%" },
      },
      {
        id: "p-005",
        title: "Alexandria Waterfront Apartments",
        image: null,
        category: "Residential",
        year: 2024,
        budget: "EGP 15M",
        duration: "12 months",
        description: "Luxury apartments with sea views, built with recycled materials and energy-efficient glass facades.",
        ecoScore: 88,
        metrics: { co2Saved: "310 tons", wastReduced: "52%", energySaved: "33%" },
      },
    ],
  },
  {
    id: "c-003",
    name: "Pyramid Sustainable Builders",
    logo: null,
    initials: "PS",
    gradient: "from-amber-500 to-orange-600",
    tagline: "Infrastructure that stands the test of time",
    rating: 4.7,
    reviewCount: 68,
    location: "Giza, Egypt",
    phone: "+20 122 333 4567",
    email: "projects@pyramidsb.eg",
    website: "pyramidsb.eg",
    founded: 2015,
    employees: "50-100",
    completedProjects: 34,
    activeProjects: 5,
    specializations: ["Infrastructure", "Public Works", "Transport"],
    certifications: ["EGBC Bronze", "ISO 9001"],
    ecoScore: 87,
    avgBudget: "EGP 10M - 80M",
    description:
      "Specialized in large-scale public infrastructure with a focus on sustainable transport and utility systems. Key contributor to New Administrative Capital projects.",
    portfolio: [
      {
        id: "p-006",
        title: "Cairo Metro Line Extension",
        image: null,
        category: "Infrastructure",
        year: 2025,
        budget: "EGP 72M",
        duration: "24 months",
        description: "3-station metro extension with energy-efficient ventilation and sustainable construction waste management.",
        ecoScore: 85,
        metrics: { co2Saved: "2,100 tons", wastReduced: "45%", energySaved: "28%" },
      },
      {
        id: "p-007",
        title: "Giza Solar Bus Terminal",
        image: null,
        category: "Transport",
        year: 2024,
        budget: "EGP 8M",
        duration: "8 months",
        description: "Solar-powered public bus terminal with green parking and EV charging stations.",
        ecoScore: 92,
        metrics: { co2Saved: "180 tons", wastReduced: "58%", energySaved: "65%" },
      },
    ],
  },
  {
    id: "c-004",
    name: "Delta Modern Engineering",
    logo: null,
    initials: "DM",
    gradient: "from-violet-500 to-purple-700",
    tagline: "Smart engineering for modern Egypt",
    rating: 4.8,
    reviewCount: 81,
    location: "Mansoura, Egypt",
    phone: "+20 100 444 5678",
    email: "hello@deltamodern.eg",
    website: "deltamodern.eg",
    founded: 2010,
    employees: "100-200",
    completedProjects: 63,
    activeProjects: 9,
    specializations: ["Healthcare", "Education", "Smart Buildings"],
    certifications: ["EGBC Gold", "ISO 14001", "ISO 45001"],
    ecoScore: 92,
    avgBudget: "EGP 3M - 30M",
    description:
      "Experts in smart building solutions for healthcare and education sectors. Pioneering IoT-integrated construction with advanced sustainability monitoring.",
    portfolio: [
      {
        id: "p-008",
        title: "Delta University Medical Center",
        image: null,
        category: "Healthcare",
        year: 2025,
        budget: "EGP 30M",
        duration: "20 months",
        description: "State-of-the-art medical facility with HEPA filtration, solar panels, and waste recycling systems.",
        ecoScore: 90,
        metrics: { co2Saved: "850 tons", wastReduced: "50%", energySaved: "40%" },
      },
      {
        id: "p-009",
        title: "Smart School Campus - Tanta",
        image: null,
        category: "Education",
        year: 2024,
        budget: "EGP 12M",
        duration: "10 months",
        description: "IoT-enabled school campus with automated energy management and natural ventilation design.",
        ecoScore: 88,
        metrics: { co2Saved: "220 tons", wastReduced: "47%", energySaved: "52%" },
      },
    ],
  },
  {
    id: "c-005",
    name: "EcoStructure Egypt",
    logo: null,
    initials: "ES",
    gradient: "from-teal-500 to-cyan-600",
    tagline: "Where sustainability meets structural excellence",
    rating: 4.6,
    reviewCount: 43,
    location: "New Administrative Capital, Egypt",
    phone: "+20 155 666 7890",
    email: "info@ecostrucutre.eg",
    website: "ecostructure.eg",
    founded: 2018,
    employees: "50-100",
    completedProjects: 21,
    activeProjects: 7,
    specializations: ["Hospitality", "Retail", "Landscape Design"],
    certifications: ["EGBC Silver", "LEED AP"],
    ecoScore: 89,
    avgBudget: "EGP 1M - 15M",
    description:
      "Boutique construction firm specializing in hospitality and retail projects. Known for biophilic design integration and sustainable interior finishing.",
    portfolio: [
      {
        id: "p-010",
        title: "Sahel Eco-Resort",
        image: null,
        category: "Hospitality",
        year: 2025,
        budget: "EGP 14M",
        duration: "12 months",
        description: "Beachfront eco-resort with 40 rooms, constructed with reclaimed wood and recycled concrete.",
        ecoScore: 91,
        metrics: { co2Saved: "280 tons", wastReduced: "65%", energySaved: "45%" },
      },
      {
        id: "p-011",
        title: "Green Mall - New Capital",
        image: null,
        category: "Retail",
        year: 2024,
        budget: "EGP 9M",
        duration: "8 months",
        description: "Eco-certified retail space with living walls, skylight daylighting, and rainwater collection.",
        ecoScore: 86,
        metrics: { co2Saved: "150 tons", wastReduced: "42%", energySaved: "38%" },
      },
    ],
  },
];

const specializations = [...new Set(contractors.flatMap((c) => c.specializations))];

/* ─────────── Helpers ─────────── */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

function EcoScoreBadge({ score, size = "sm" }) {
  const color = score >= 90 ? "text-accent bg-accent/10" : score >= 80 ? "text-blue-600 bg-blue-50" : "text-amber-600 bg-amber-50";
  return (
    <span className={`inline-flex items-center gap-1 font-bold rounded-full ${color} ${size === "lg" ? "text-sm px-3 py-1.5" : "text-xs px-2 py-1"}`}>
      <Leaf size={size === "lg" ? 14 : 12} />
      {score}/100
    </span>
  );
}

/* ─────────── Portfolio Modal ─────────── */
function PortfolioProject({ project }) {
  return (
    <div className="bg-background rounded-xl border border-border/50 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Project image placeholder */}
      <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
        <Building2 size={36} className="text-primary/20" />
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs font-medium">
            {project.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <EcoScoreBadge score={project.ecoScore} />
        </div>
      </div>

      <div className="p-5">
        <h4 className="font-bold text-primary text-base mb-1.5">{project.title}</h4>
        <p className="text-xs text-secondary leading-relaxed mb-4">{project.description}</p>

        {/* Project details */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <DollarSign size={12} className="text-blue-500" />
            {project.budget}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock size={12} className="text-amber-500" />
            {project.duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Calendar size={12} className="text-purple-500" />
            {project.year}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Leaf size={12} className="text-accent" />
            {project.metrics.co2Saved} CO₂
          </div>
        </div>

        {/* Impact metrics */}
        <div className="flex gap-2">
          {[
            { label: "Waste ↓", value: project.metrics.wastReduced, color: "bg-accent/10 text-accent" },
            { label: "Energy ↓", value: project.metrics.energySaved, color: "bg-blue-50 text-blue-600" },
          ].map((m) => (
            <span key={m.label} className={`text-[10px] font-semibold px-2 py-1 rounded-full ${m.color}`}>
              {m.label} {m.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── Contractor Card ─────────── */
function ContractorCard({ contractor, onViewProfile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1 transition-all duration-500 overflow-hidden border-border/60">
        <CardContent className="p-0">
          {/* Top banner */}
          <div className={`h-24 bg-gradient-to-r ${contractor.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-60" />
            {/* Eco badge */}
            <div className="absolute top-3 right-3">
              <EcoScoreBadge score={contractor.ecoScore} />
            </div>
            {/* Stats overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-3">
              <span className="text-[10px] font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                {contractor.completedProjects} Projects
              </span>
              <span className="text-[10px] font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                {contractor.activeProjects} Active
              </span>
            </div>
          </div>

          <div className="p-5 pt-0 relative">
            {/* Avatar */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contractor.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg border-3 border-white -mt-7 relative z-10`}>
              {contractor.initials}
            </div>

            {/* Info */}
            <div className="mt-3">
              <h3 className="font-bold text-primary text-base group-hover:text-accent transition-colors duration-300">{contractor.name}</h3>
              <p className="text-xs text-muted mt-0.5">{contractor.tagline}</p>
            </div>

            {/* Rating + Location */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <StarRating rating={contractor.rating} />
                <span className="text-xs font-semibold text-primary">{contractor.rating}</span>
                <span className="text-[10px] text-muted">({contractor.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <MapPin size={12} />
                {contractor.location.split(",")[0]}
              </div>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {contractor.specializations.map((spec) => (
                <span key={spec} className="text-[10px] font-medium bg-background text-secondary px-2 py-1 rounded-md border border-border/50">
                  {spec}
                </span>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-1.5 mt-3">
              {contractor.certifications.slice(0, 3).map((cert) => (
                <span key={cert} className="flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent/5 px-2 py-0.5 rounded-full">
                  <Shield size={10} /> {cert}
                </span>
              ))}
            </div>

            {/* Budget range + CTA */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
              <div>
                <div className="text-[10px] text-muted font-medium">Budget Range</div>
                <div className="text-xs font-bold text-primary">{contractor.avgBudget}</div>
              </div>
              <Button
                size="sm"
                onClick={() => onViewProfile(contractor)}
                className="h-9 text-xs gap-1.5"
              >
                <Eye size={13} /> View Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─────────── Main Page ─────────── */
export default function ContractorsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = contractors
    .filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()) ||
        c.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchSpec = selectedSpec === "All" || c.specializations.includes(selectedSpec);
      return matchSearch && matchSpec;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "eco") return b.ecoScore - a.ecoScore;
      if (sortBy === "projects") return b.completedProjects - a.completedProjects;
      return 0;
    });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <HardHat size={22} className="text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Contractors</h1>
            <p className="text-sm text-secondary">Find verified contractors to execute your projects</p>
          </div>
        </div>
      </div>

      {/* Search + Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search contractors by name, location, or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-border/60 text-sm text-primary placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`h-10 px-4 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all ${showFilters ? "bg-accent/10 border-accent/30 text-accent" : "bg-white border-border/60 text-secondary hover:bg-gray-50"}`}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
      </div>

      {/* Expandable filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl border border-border/60 p-5 space-y-4">
              {/* Specialization chips */}
              <div>
                <label className="text-xs font-semibold text-primary mb-2 block">Specialization</label>
                <div className="flex flex-wrap gap-2">
                  {["All", ...specializations].map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpec(spec)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${selectedSpec === spec ? "bg-accent text-white border-accent" : "bg-background text-secondary border-border/50 hover:border-accent/30"}`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
              {/* Sort */}
              <div>
                <label className="text-xs font-semibold text-primary mb-2 block">Sort By</label>
                <div className="flex gap-2">
                  {[
                    { key: "rating", label: "Highest Rated", icon: Star },
                    { key: "eco", label: "Eco Score", icon: Leaf },
                    { key: "projects", label: "Most Projects", icon: Briefcase },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setSortBy(opt.key)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${sortBy === opt.key ? "bg-primary text-white border-primary" : "bg-background text-secondary border-border/50 hover:border-primary/30"}`}
                    >
                      <opt.icon size={12} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing <span className="font-semibold text-primary">{filtered.length}</span> contractors
        </p>
      </div>

      {/* Contractors grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((contractor) => (
          <ContractorCard
            key={contractor.id}
            contractor={contractor}
            onViewProfile={setSelectedContractor}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <HardHat size={48} className="mx-auto text-muted/30 mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-1">No contractors found</h3>
          <p className="text-sm text-muted">Try adjusting your search or filters</p>
        </div>
      )}

      {/* ─────────── Contractor Profile Modal ─────────── */}
      <Modal
        isOpen={!!selectedContractor}
        onClose={() => setSelectedContractor(null)}
        title=""
        size="xl"
      >
        {selectedContractor && (
          <div className="space-y-6 -mt-2">
            {/* Profile header */}
            <div className={`-mx-6 -mt-6 p-4 sm:p-6 pb-5 bg-gradient-to-r ${selectedContractor.gradient} relative overflow-hidden rounded-t-2xl`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-60" />
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg sm:text-xl border border-white/20 flex-shrink-0">
                  {selectedContractor.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">{selectedContractor.name}</h2>
                  <p className="text-xs sm:text-sm text-white/70 mt-0.5 line-clamp-2">{selectedContractor.tagline}</p>
                  <div className="flex items-center gap-3 mt-2 sm:mt-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <StarRating rating={selectedContractor.rating} />
                      <span className="text-sm font-semibold text-white">{selectedContractor.rating}</span>
                      <span className="text-xs text-white/60">({selectedContractor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedContractor(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-all flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: "Completed", value: selectedContractor.completedProjects, icon: CheckCircle2, color: "text-accent" },
                { label: "Active", value: selectedContractor.activeProjects, icon: TrendingUp, color: "text-blue-600" },
                { label: "Eco Score", value: `${selectedContractor.ecoScore}/100`, icon: Leaf, color: "text-emerald-600" },
                { label: "Since", value: selectedContractor.founded, icon: Calendar, color: "text-purple-600" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-background rounded-xl p-3 border border-border/50">
                  <stat.icon size={18} className={`mx-auto mb-1.5 ${stat.color}`} />
                  <div className="text-lg font-bold text-primary">{stat.value}</div>
                  <div className="text-[10px] text-muted font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-bold text-primary mb-2">About</h3>
              <p className="text-sm text-secondary leading-relaxed">{selectedContractor.description}</p>
            </div>

            {/* Contact + Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background rounded-xl p-4 border border-border/50 space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Contact</h4>
                <div className="space-y-2.5">
                  {[
                    { icon: MapPin, value: selectedContractor.location },
                    { icon: Phone, value: selectedContractor.phone },
                    { icon: Mail, value: selectedContractor.email },
                    { icon: Globe, value: selectedContractor.website },
                  ].map((item) => (
                    <div key={item.value} className="flex items-center gap-2.5 text-xs text-secondary">
                      <item.icon size={13} className="text-muted flex-shrink-0" />
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background rounded-xl p-4 border border-border/50 space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Details</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-secondary">
                    <Users size={13} className="text-muted" /> {selectedContractor.employees} employees
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-secondary">
                    <DollarSign size={13} className="text-muted" /> {selectedContractor.avgBudget}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedContractor.certifications.map((cert) => (
                      <span key={cert} className="flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent/5 px-2 py-0.5 rounded-full">
                        <Award size={10} /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-primary">
                  Portfolio ({selectedContractor.portfolio.length} projects)
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {selectedContractor.portfolio.map((project) => (
                  <PortfolioProject key={project.id} project={project} />
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-1">
              <Button className="flex-1 h-11 gap-2">
                <MessageSquare size={15} /> Contact Contractor
              </Button>
              <Button variant="outline" className="flex-1 h-11 gap-2">
                <Briefcase size={15} /> Request Quote
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}