import { Target, Upload, Cpu, Activity } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect Your Projects",
    description: "Import project data, upload bills, and connect with your supply chain in minutes.",
    icon: Upload,
    color: "bg-blue-50 text-blue-600",
    ring: "ring-blue-100",
  },
  {
    step: "02",
    title: "AI Analyzes Everything",
    description: "Our AI engine processes data to identify waste patterns, cost savings, and sustainability opportunities.",
    icon: Cpu,
    color: "bg-accent/10 text-accent",
    ring: "ring-accent/20",
  },
  {
    step: "03",
    title: "Take Intelligent Action",
    description: "Get actionable recommendations, compare eco-certified materials, and track your green impact in real-time.",
    icon: Activity,
    color: "bg-emerald-50 text-emerald-600",
    ring: "ring-emerald-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4 bg-accent/5 px-4 py-1.5 rounded-full">
            <Target size={15} /> Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            Three steps to smarter
            <br />
            <span className="gradient-text">construction</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line - animated from left to right */}
          <div className="hidden md:block absolute top-16 left-[18%] right-[18%] h-px bg-gradient-to-r from-border via-accent/30 to-border origin-left animate-line-draw" />

          {steps.map((item, i) => (
            <div key={item.step} data-aos="fade-up" data-aos-delay={i * 150} className="relative text-center">
              {/* Step circle */}
              <div className="relative mx-auto mb-8 w-16">
                <div
                  className={`w-16 h-16 rounded-2xl ${item.color} ring-8 ${item.ring} flex items-center justify-center shadow-sm`}
                >
                  <item.icon size={24} />
                </div>
                <div className="absolute -top-8 right-4 w-7 h-7 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-lg animate-badge-float">
                  {item.step}
                </div>
              </div>

              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed max-w-[280px] mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes badgeFloat {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-8px);
            opacity: 0.7;
          }
        }

        @keyframes lineDraw {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        :global(.animate-badge-float) {
          animation: badgeFloat 2.5s ease-in-out infinite;
        }

        :global(.animate-line-draw) {
          animation: lineDraw 1.2s ease-out 0.6s forwards;
          transform: scaleX(0);
        }
      `}</style>
    </section>
  );
}
