"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const roles = [
  "Web Solutions",
  "Digital Platforms",
  "Scalable Products",
  "Custom Systems",
  "Enterprise Websites",
  "Modern Applications",
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      {/* Subtle glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            We Build Reliable, Scalable & Future-Ready{" "}
            <span className="relative inline-block">
              <span className="text-gradient-orange">
                {roles[currentRoleIndex]}
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Modern Websites Engineered for Speed, Security & Scalability.{" "}
            <span className="text-foreground font-semibold">
              Save up to 20%
            </span>{" "}
            and create secure, user friendly Web & Mobile Experiences.
          </p>

          {/* CTA Buttons */}
     <Button
  asChild
  size="lg"
  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group"
>
  <Link
    href="/contact"
    className="flex items-center gap-2"
  >
    Get In Touch
    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
  </Link>
</Button>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span>100% Full Time Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span>2,000 + Websites Built</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
