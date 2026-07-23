import { Metadata } from "next";

import {
  Navbar,
  Hero,
  CTA,
  Footer,
  ValuesSection,
  MissionSection,
  TimelineSection,
  DeveloperCards,
  TestimonialEmblaSlider,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "About Us | IT Solutions & Software Development Company",
  description:
    "Learn about our expertise in Web Development, WordPress, Next.js, SEO and Digital Marketing services.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ValuesSection />
      <MissionSection />
      <TimelineSection />
      <DeveloperCards />
      <TestimonialEmblaSlider />
      <CTA />
      <Footer />
    </main>
  );
}
