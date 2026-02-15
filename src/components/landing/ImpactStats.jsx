"use client";

import { Leaf, TrendingDown, LineChart, Target, Activity } from "lucide-react";
import CountUp from "./CountUp";

const stats = [
  { end: 4200, prefix: "", suffix: "+", label: "Tons CO₂ Reduced", icon: Leaf, iconColor: "text-accent-light" },
  { end: 67, prefix: "", suffix: "%", label: "Average Waste Reduction", icon: TrendingDown, iconColor: "text-emerald-300" },
  { end: 2.4, prefix: "SAR ", suffix: "M", label: "Total Cost Savings", decimals: 1, icon: LineChart, iconColor: "text-blue-300" },
  { end: 150, prefix: "", suffix: "+", label: "Projects Optimized", icon: Target, iconColor: "text-amber-300" },
];

export default function ImpactStats() {
  return (
    <section id="impact" className="py-28 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay opacity-40" />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold mb-4 bg-white/[0.06] px-4 py-1.5 rounded-full border border-white/[0.08]">
            <Activity size={15} /> Real Results
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-shadow-hero">
            Measurable Impact
          </h2>
          <p className="text-white/50 mt-5 max-w-lg mx-auto text-lg leading-relaxed">
            Real results from real projects. See how Bunyan is transforming the construction industry.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-2xl p-7 text-center hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-500"
            >
              <div className={`${stat.iconColor} mb-4 flex justify-center`}>
                <stat.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  duration={2400}
                />
              </div>
              <div className="text-sm text-white/50 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
