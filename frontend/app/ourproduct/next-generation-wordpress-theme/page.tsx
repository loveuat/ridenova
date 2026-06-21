import { Metadata } from "next";

import {
  Navbar,
  Hero,
  NextGenerationTheme,
  CTA,
  Footer,
} from "@/components/sections";


export const metadata: Metadata = {
  title: "NextGenerationTheme",
  description:
    "our expertise in Web Development, WordPress, Next.js, SEO and Digital Marketing services.",
};

export default function NextGenerationThemes() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <NextGenerationTheme />
      <CTA />
      <Footer />
    </main>
  );
}
