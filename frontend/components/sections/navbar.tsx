"use client";

import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Products", href: "/ourproduct" },
  { name: "Our Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-border bg-black dark:bg-white transition-colors">
                <img
                  src="/aislogo.webp"
                  alt="Atulya IT Solutions Logo"
                  loading="eager"
                  className="w-10 h-10 object-contain rounded-xl"
                />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-lg text-foreground">
                  Atulya IT Solutions
                </span>
                <span className="text-xs text-muted-foreground">
                  Analyze. Architect. Accelerate.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />

              <Button
                onClick={() => setShowWhatsapp(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Let’s Chat
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />

              <button
                className="text-foreground"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Button
                onClick={() => {
                  setShowWhatsapp(true);
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Contact Us
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Floating WhatsApp Bubble */}
      {!showWhatsapp && (
        <button
          onClick={() => setShowWhatsapp(true)}
          className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl hover:scale-110 transition-all duration-300"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* WhatsApp Popup */}
      {showWhatsapp && (
        <div className="fixed bottom-6 right-6 z-[100] w-[360px] max-w-[90vw] overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-border">

          {/* Header */}
          <div className="bg-green-500 p-4 text-white flex items-center justify-between">
            <div>
              <h3 className="font-bold">
                Atulya IT Solutions
              </h3>
              <p className="text-xs opacity-90">
                Typically replies within minutes
              </p>
            </div>

            <button onClick={() => setShowWhatsapp(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-muted/30">
            <div className="rounded-xl bg-background p-3 border shadow-sm">
              <p className="text-sm">
                👋 Hi there!
                <br />
                Need help with WordPress, Next.js, SEO, AI Solutions or a new
                project?
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-4">
            <a
              href="https://wa.me/918770570764?text=Hi%20Atulya%20IT%20Solutions,%20I%20want%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-green-500 py-3 text-center font-semibold text-white hover:bg-green-600 transition"
            >
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}
    </>
  );
}
