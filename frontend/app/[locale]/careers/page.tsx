import {
  Navbar,
  Hero,
  Careers,
  CTA,
  Footer,
} from "@/components/sections";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Careers />
      <CTA />
      <Footer />
    </main>
  );
}
