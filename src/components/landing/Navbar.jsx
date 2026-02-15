"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        navScrolled
          ? "glass border-b border-gray-200/60 shadow-sm"
          : "bg-transparent border-b border-white/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/Logo.png"
              alt="Bunyan"
              width={42}
              height={42}
              className="rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              navScrolled ? "text-primary" : "text-white"
            }`}
          >
            Bunyan
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Features", href: "#features" },
            { label: "How it Works", href: "#how-it-works" },
            { label: "Impact", href: "#impact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                navScrolled
                  ? "text-secondary hover:text-primary hover:bg-gray-100/80"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              navScrolled
                ? "text-primary hover:bg-gray-100/80"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 h-10 px-5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02]"
          >
            Get Started <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
