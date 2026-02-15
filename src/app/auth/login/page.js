"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useStore";
import { mockUser } from "@/lib/mock-data";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setProfile } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate auth - in production, use Supabase
    await new Promise((r) => setTimeout(r, 1000));
    
    setUser({ id: mockUser.id, email: email || mockUser.email });
    setProfile(mockUser);
    router.push("/app/dashboard");
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <Image src="/Logo.png" alt="Bunyan" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-primary">Bunyan</span>
          </Link>

          <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
          <p className="text-secondary mt-2">Sign in to continue to your dashboard</p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="relative">
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-muted hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="text-sm text-accent hover:text-accent-dark transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-accent font-medium hover:text-accent-dark transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/10">
            <Image src="/Logo.png" alt="Bunyan" width={48} height={48} className="rounded-xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Build Smarter with AI Intelligence
          </h2>
          <p className="text-white/60 leading-relaxed">
            Access AI-powered analytics, sustainable material sourcing, and real-time project optimization — all in one platform.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "67%", label: "Less Waste" },
              { value: "4.2K", label: "CO₂ Saved" },
              { value: "94/100", label: "Eco Score" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-lg font-bold text-white">{s.value}</div>
                <div className="text-[10px] text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
