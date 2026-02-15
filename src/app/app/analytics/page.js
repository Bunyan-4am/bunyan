"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTransition, FadeIn } from "@/components/ui/animations";
import { mockAnalyticsData, mockDashboardStats } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingDown,
  Leaf,
  DollarSign,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border/50 rounded-xl shadow-lg p-3">
      <p className="text-xs font-medium text-primary mb-1">{label}</p>
      {payload.map((item, i) => (
        <p key={i} className="text-xs text-muted">
          <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: item.color }} />
          {item.name}: <span className="font-medium text-primary">{typeof item.value === "number" && item.value > 1000 ? formatCurrency(item.value) : item.value}</span>
        </p>
      ))}
    </div>
  );
};

const kpiCards = [
  {
    label: "Waste Reduced",
    value: "4.2%",
    change: "-2.3%",
    positive: true,
    icon: TrendingDown,
    color: "bg-accent/10 text-accent",
    description: "Current waste rate",
  },
  {
    label: "CO₂ Saved",
    value: "1,240 tons",
    change: "+190t",
    positive: true,
    icon: Leaf,
    color: "bg-emerald-50 text-emerald-600",
    description: "This quarter",
  },
  {
    label: "Cost Savings",
    value: "SAR 124K",
    change: "+19K",
    positive: true,
    icon: DollarSign,
    color: "bg-blue-50 text-blue-600",
    description: "This month",
  },
  {
    label: "Optimization Rate",
    value: "94.2%",
    change: "+3.1%",
    positive: true,
    icon: Target,
    color: "bg-amber-50 text-amber-600",
    description: "Above target",
  },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6m");

  return (
    <PageTransition>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Analytics</h1>
          <p className="text-sm text-secondary mt-1">Track your sustainability metrics and cost optimization</p>
        </div>
        <div className="flex gap-1 bg-white rounded-lg border border-border/50 p-0.5">
          {[
            { value: "1m", label: "1M" },
            { value: "3m", label: "3M" },
            { value: "6m", label: "6M" },
            { value: "1y", label: "1Y" },
          ].map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                period === p.value ? "bg-primary text-white" : "text-secondary hover:text-primary"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi, i) => (
          <FadeIn key={kpi.label} delay={i * 0.08}>
            <Card hover>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${kpi.positive ? "text-accent" : "text-danger"}`}>
                    {kpi.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary">{kpi.value}</p>
                <p className="text-xs text-muted mt-0.5">{kpi.description}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Waste Reduction Over Time */}
        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown size={18} className="text-accent" />
                Waste Reduction Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={mockAnalyticsData.wasteReduction}>
                  <defs>
                    <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2e8c58" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2e8c58" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#788593" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#788593" }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2e8c58"
                    strokeWidth={2.5}
                    fill="url(#wasteGrad)"
                    name="Waste %"
                    dot={{ r: 4, fill: "#2e8c58", strokeWidth: 2, stroke: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* CO2 Reduction */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf size={18} className="text-emerald-600" />
                CO₂ Reduction Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={mockAnalyticsData.co2Reduction}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#788593" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#788593" }} axisLine={false} tickLine={false} unit="t" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#102a4e"
                    strokeWidth={2.5}
                    name="CO₂ Saved (tons)"
                    dot={{ r: 4, fill: "#102a4e", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Budget Distribution */}
        <FadeIn delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={18} className="text-blue-600" />
                Budget Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie
                      data={mockAnalyticsData.budgetDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {mockAnalyticsData.budgetDistribution.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3">
                  {mockAnalyticsData.budgetDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-secondary flex-1">{item.name}</span>
                      <span className="text-xs font-medium text-primary">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Monthly Optimization */}
        <FadeIn delay={0.5}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={18} className="text-amber-600" />
                Monthly Optimization Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={mockAnalyticsData.monthlyOptimization} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#788593" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#788593" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="saved" name="Actual Savings" fill="#2e8c58" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="target" name="Target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
