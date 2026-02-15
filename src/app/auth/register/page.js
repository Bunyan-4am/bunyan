"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { useAuthStore } from "@/store/useStore";
import { mockUser } from "@/lib/mock-data";
import { ArrowRight, Eye, EyeOff, Building2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setProfile } = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "contractor",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 1200));

    const profile = {
      ...mockUser,
      full_name: form.fullName || mockUser.full_name,
      email: form.email || mockUser.email,
      company_name: form.company || mockUser.company_name,
      role: form.role,
    };
    setUser({ id: profile.id, email: profile.email });
    setProfile(profile);
    router.push("/app/dashboard");

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Visual */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/10">
            <Building2 size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Green Construction Revolution
          </h2>
          <p className="text-white/60 leading-relaxed">
            Get started in minutes and start reducing waste, saving costs, and protecting the environment with AI.
          </p>
          <div className="mt-10 space-y-3">
            {[
              "AI-powered project analysis",
              "Verified eco-certified suppliers",
              "Real-time sustainability tracking",
              "Smart cost optimization",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-left bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent-light" />
                </div>
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <Image src="/Logo.png" alt="Bunyan" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-primary">Bunyan</span>
          </Link>

          <h1 className="text-3xl font-bold text-primary">Create your account</h1>
          <p className="text-secondary mt-2">Start your 14-day free trial</p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <Input
              label="Full Name"
              placeholder="Ahmed Al-Rashid"
              value={form.fullName}
              onChange={handleChange("fullName")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="ahmed@company.com"
              value={form.email}
              onChange={handleChange("email")}
            />
            <Input
              label="Company Name"
              placeholder="Al-Rashid Construction"
              value={form.company}
              onChange={handleChange("company")}
            />
            <Select
              label="Account Type"
              value={form.role}
              onChange={handleChange("role")}
              options={[
                { value: "contractor", label: "Contractor" },
                { value: "supplier", label: "Supplier" },
                { value: "developer", label: "Developer" },
                { value: "client", label: "Client" },
              ]}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-muted hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent font-medium hover:text-accent-dark transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
