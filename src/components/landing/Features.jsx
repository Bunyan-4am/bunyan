import {
  Brain,
  Leaf,
  TrendingDown,
  Shield,
  BarChart3,
  Globe,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Control Center",
    description: "Chat with AI to analyze bills, optimize costs, compare materials, and get sustainability recommendations.",
    colors: ["#102a4e", "#1a3d6e"],
    accent: "group-hover:border-blue-200",
  },
  {
    icon: Leaf,
    title: "Environmental Protection",
    description: "Track CO₂ emissions, monitor waste output, and get actionable insights to reduce environmental impact.",
    colors: ["#2e8c58", "#3aa86a"],
    accent: "group-hover:border-green-200",
  },
  {
    icon: TrendingDown,
    title: "Cost Optimization",
    description: "AI-powered bill scanning, vendor comparison, and budget forecasting to cut costs without cutting quality.",
    colors: ["#2563eb", "#3b82f6"],
    accent: "group-hover:border-blue-200",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Real-time dashboards tracking waste reduction, sustainability scores, and financial performance.",
    colors: ["#d97706", "#f59e0b"],
    accent: "group-hover:border-amber-200",
  },
  {
    icon: Shield,
    title: "Verified Marketplace",
    description: "Access eco-certified materials from verified suppliers with transparent sustainability metrics.",
    colors: ["#059669", "#10b981"],
    accent: "group-hover:border-emerald-200",
  },
  {
    icon: Globe,
    title: "Compliance Ready",
    description: "Stay ahead of environmental regulations with automated compliance tracking and reporting.",
    colors: ["#7c3aed", "#8b5cf6"],
    accent: "group-hover:border-purple-200",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4 bg-accent/5 px-4 py-1.5 rounded-full">
            <Layers size={15} /> Core Capabilities
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            Everything you need to
            <br />
            <span className="gradient-text">build sustainably</span>
          </h2>
          <p className="text-secondary mt-5 text-lg leading-relaxed max-w-xl mx-auto">
            From AI-powered procurement to real-time waste tracking — the tools to make every project greener and more cost-effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className={`group relative bg-white rounded-2xl border border-border/60 p-7 transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1 ${feature.accent}`}
            >
              {/* Gradient blob on hover */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -translate-y-8 translate-x-8"
                style={{
                  background: `radial-gradient(circle, ${feature.colors[1]}15, transparent)`,
                }}
              />

              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${feature.colors[0]}, ${feature.colors[1]})`,
                    boxShadow: `0 8px 20px ${feature.colors[0]}25`,
                  }}
                >
                  <feature.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2.5">{feature.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{feature.description}</p>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-muted group-hover:text-accent transition-colors duration-300">
                  Learn more <ArrowUpRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
