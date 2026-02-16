import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px]" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl overflow-hidden shadow-lg shadow-primary/10 ring-4 ring-white">
            <Image src="/Logo.png" alt="Bunyan" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            Ready to build a
            <br />
            <span className="gradient-text">greener future?</span>
          </h2>
          <p className="text-secondary mt-5 max-w-lg mx-auto text-lg leading-relaxed">
            Join the construction companies already saving millions while protecting the environment.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2.5 h-14 px-8 bg-accent text-white font-semibold rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-xl shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02]"
            >
              Get Started Free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2.5 h-14 px-8 bg-white text-primary font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-border shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted">
          {["Free for Early Access Users", "Verified Suppliers Only", "Eco-Optimized Calculations", "Built for Real Projects"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-accent" />
              <span className="font-medium">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
