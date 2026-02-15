"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Leaf,
  TrendingDown,
  Sparkles,
  Play,
  LineChart,
  Award,
} from "lucide-react";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-accent-light/30 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float ${4 + i * 0.8}s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Ambient background visuals */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay opacity-50" />
      <FloatingParticles />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute top-[15%] left-[30%] w-[250px] h-[250px] bg-blue-500/5 rounded-full blur-[80px]" />

      {/* Orbit rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.03] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.05] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.04] rounded-full" />

      {/* Orbiting dots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div style={{ animation: "orbit 20s linear infinite" }}>
          <div className="w-2 h-2 bg-accent/60 rounded-full" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div style={{ animation: "orbit-reverse 25s linear infinite" }}>
          <div className="w-1.5 h-1.5 bg-blue-400/40 rounded-full" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Copy */}
        <div className="max-w-xl">
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.07] backdrop-blur-md text-white/90 text-xs font-semibold rounded-full border border-white/[0.1] mb-8 tracking-wide uppercase"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
              <Sparkles size={11} className="text-accent-light" />
            </span>
            AI-Powered Construction Intelligence
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-white leading-[1.08] tracking-tight text-shadow-hero"
          >
            Build Smarter.
            <br />
            <span className="relative">
              <span className="gradient-text-accent">Build Greener.</span>
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-7 text-lg lg:text-xl text-white/60 max-w-[480px] leading-relaxed font-light"
          >
            Transform construction management with AI-driven insights for waste reduction,
            cost optimization, and environmental protection.
          </p>

          <div data-aos="fade-up" data-aos-delay="300" className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2.5 h-13 px-7 bg-accent text-white font-semibold rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.02]"
            >
              Start Free Trial
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-2.5 h-13 px-7 bg-white/[0.08] text-white font-medium rounded-2xl hover:bg-white/[0.14] transition-all duration-300 border border-white/[0.12] backdrop-blur-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Play size={12} className="text-white ml-0.5" />
              </span>
              See How it Works
            </a>
          </div>

          {/* Hero mini-stats */}
          <div data-aos="fade-up" data-aos-delay="400" className="mt-14 flex items-center gap-10">
            {[
              { label: "CO₂ Reduced", value: "4,200+", unit: "tons" },
                { label: "Cost Saved", value: "EGP 2.4M+" },
              { label: "Active Projects", value: "150+" },
            ].map((stat, i) => (
              <div key={stat.label} className="relative">
                {i > 0 && (
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />
                )}
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-sm font-normal text-white/40 ml-1">{stat.unit}</span>
                  )}
                </div>
                <div className="text-xs text-white/40 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Dashboard preview */}
        <div data-aos="fade-left" data-aos-delay="300" className="hidden lg:block relative">
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-accent/10 rounded-[32px] blur-2xl opacity-50" />

          <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-[28px] border border-white/[0.1] p-2 shadow-2xl">
            {/* Inner dark card */}
            <div className="bg-gradient-to-br from-[#0c2240] to-[#0a1c35] rounded-[22px] p-5 overflow-hidden relative">
              {/* Shimmer overlay */}
              <div className="absolute inset-0 shimmer rounded-[22px]" />

              {/* Browser chrome */}
              <div className="relative flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-white/[0.06] rounded-lg h-6 flex items-center px-3">
                    <span className="text-[10px] text-white/30 font-mono">bunyan.ai/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Stat cards row */}
              <div className="relative grid grid-cols-2 gap-2.5 mb-4">
                {[
                  { label: "CO₂ Saved", value: "1,240 t", icon: Leaf, bg: "from-accent/25 to-accent/10", text: "text-accent-light" },
                  { label: "Waste ↓", value: "67%", icon: TrendingDown, bg: "from-emerald-500/25 to-emerald-500/10", text: "text-emerald-300" },
                  { label: "Budget Saved", value: "EGP 2.4M", icon: LineChart, bg: "from-blue-500/25 to-blue-500/10", text: "text-blue-300" },
                  { label: "Eco Score", value: "94/100", icon: Award, bg: "from-amber-500/25 to-amber-500/10", text: "text-amber-300" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={`bg-gradient-to-br ${card.bg} rounded-xl p-3.5 border border-white/[0.05]`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-medium ${card.text} opacity-80`}>
                        {card.label}
                      </span>
                      <card.icon size={12} className={`${card.text} opacity-60`} />
                    </div>
                    <div className={`text-xl font-bold ${card.text}`}>{card.value}</div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="relative bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-white/40 font-medium">Waste Reduction Trend</span>
                  <span className="text-[9px] text-accent-light/60 font-medium">-45% this quarter</span>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[72, 58, 48, 42, 35, 28, 22, 18, 15, 12].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className="w-full rounded-t-sm transition-all duration-500"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, rgba(46,140,88,0.6), rgba(58,168,106,${0.2 + i * 0.04}))`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* AI chat teaser */}
              <div className="relative mt-3 bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Brain size={11} className="text-accent-light" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/[0.06] rounded-full w-3/4" />
                    <div className="h-2 bg-white/[0.04] rounded-full w-1/2 mt-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -left-6 top-1/4 float-animation">
            <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Leaf size={14} className="text-accent-light" />
                </div>
                <div>
                  <div className="text-[10px] text-white/40">Eco Score</div>
                  <div className="text-sm font-bold text-white">94/100</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-1/4 float-animation-delayed">
            <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <TrendingDown size={14} className="text-blue-300" />
                </div>
                <div>
                  <div className="text-[10px] text-white/40">Cost Saved</div>
                  <div className="text-sm font-bold text-white">SAR 2.4M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
