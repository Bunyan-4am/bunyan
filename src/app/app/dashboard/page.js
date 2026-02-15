"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter, FadeIn, StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/animations";
import { mockProjects, mockDashboardStats, mockActivityLogs } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Leaf,
  Recycle,
  DollarSign,
  FolderOpen,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Brain,
  TrendingDown,
  Activity,
} from "lucide-react";

function SustainabilityGauge({ score }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#2e8c58" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-primary">{score}</span>
        <span className="text-[10px] text-muted">/ 100</span>
      </div>
    </div>
  );
}

const statCards = [
  {
    label: "CO₂ Saved",
    value: mockDashboardStats.co2Saved,
    suffix: " tons",
    icon: Leaf,
    color: "text-accent",
    bg: "bg-accent/10",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    label: "Waste Reduced",
    value: mockDashboardStats.wasteReduced,
    suffix: "%",
    icon: Recycle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    label: "Money Saved",
    value: mockDashboardStats.moneySaved,
    prefix: "SAR ",
    icon: DollarSign,
    color: "text-blue-600",
    bg: "bg-blue-50",
    trend: "+23.1%",
    trendUp: true,
  },
  {
    label: "Active Projects",
    value: mockDashboardStats.activeProjects,
    icon: FolderOpen,
    color: "text-amber-600",
    bg: "bg-amber-50",
    trend: "+1",
    trendUp: true,
  },
];

const statusColors = {
  active: "accent",
  planning: "info",
  completed: "success",
  "on-hold": "warning",
};

export default function DashboardPage() {
  const recentProjects = useMemo(() => mockProjects.slice(0, 4), []);

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-sm text-secondary mt-1">Welcome back, Ahmed. Here&apos;s your sustainability overview.</p>
      </div>

      {/* Stats Cards */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card hover className="relative overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wide">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary mt-2">
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon size={20} className={stat.color} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <ArrowUpRight size={14} className="text-accent" />
                  <span className="text-xs font-medium text-accent">{stat.trend}</span>
                  <span className="text-xs text-muted">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Link
                href="/app/projects"
                className="text-xs text-accent font-medium hover:text-accent-dark flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight size={12} />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-background transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <FolderOpen size={18} className="text-primary/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-primary truncate">{project.name}</p>
                        <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                      </div>
                      <p className="text-xs text-muted mt-0.5">{project.location}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-primary">
                        {formatCurrency(project.spent)}
                      </p>
                      <p className="text-xs text-muted">
                        of {formatCurrency(project.budget)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Sustainability Index */}
        <FadeIn delay={0.3}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sustainability Index</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <SustainabilityGauge score={87} />
              <p className="text-sm font-medium text-primary mt-4">Excellent</p>
              <p className="text-xs text-muted text-center mt-1">
                Your projects are performing above industry average
              </p>

              <div className="w-full mt-6 space-y-3">
                {[
                  { label: "Environmental", score: 92, color: "bg-accent" },
                  { label: "Resource Efficiency", score: 85, color: "bg-blue-500" },
                  { label: "Waste Management", score: 88, color: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">{item.label}</span>
                      <span className="font-medium text-primary">{item.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Quick Actions */}
        <FadeIn delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "AI Analysis", icon: Brain, href: "/app/ai-center", color: "bg-accent/10 text-accent" },
                  { label: "New Project", icon: FolderOpen, href: "/app/projects", color: "bg-blue-50 text-blue-600" },
                  { label: "Browse Materials", icon: TrendingDown, href: "/app/marketplace", color: "bg-emerald-50 text-emerald-600" },
                  { label: "View Analytics", icon: Activity, href: "/app/analytics", color: "bg-amber-50 text-amber-600" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-accent/30 hover:shadow-sm transition-all group"
                  >
                    <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon size={18} />
                    </div>
                    <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Recent Activity */}
        <FadeIn delay={0.5}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityLogs.slice(0, 4).map((log, i) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-background border border-border/50 flex items-center justify-center">
                        <Clock size={14} className="text-muted" />
                      </div>
                      {i < 3 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-6 bg-border/50" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm text-primary">{log.description}</p>
                      <p className="text-xs text-muted mt-0.5">{formatDate(log.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
