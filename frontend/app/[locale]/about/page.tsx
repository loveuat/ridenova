import { Metadata } from "next";

import {
  Navbar,
  Hero,
  CTA,
  Footer,
  //ValuesSection,
   WhyChooseUs,
  MissionSection,
  //TimelineSection,
  //DeveloperCards,
  TestimonialEmblaSlider,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "About Us | Trip Mitra Go, Car Rental & Taxi Service in Balaghat",
  description:
    "Book reliable car rental and taxi services in Balaghat with Trip Mitra. Airport transfers, outstation cabs, one-way taxi, wedding cars, corporate travel, Innova Crysta, Tempo Traveller and 24×7 booking across Central India.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/*<ValuesSection />*/}
      < WhyChooseUs />
      <MissionSection />
      {/*<TimelineSection />
      <DeveloperCards />*/}
      <TestimonialEmblaSlider />
      <CTA />
      <Footer />
    </main>
  );
}
