"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Navbar,
  Hero,
  TrustedBy,
  Features,
  HowItWorks,
  ImpactStats,
  Testimonial,
  CallToAction,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic", offset: 60 });
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <ImpactStats />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
}
