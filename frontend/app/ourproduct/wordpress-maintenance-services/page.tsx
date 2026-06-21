import { Metadata } from "next";

import {
  Navbar,
  Hero,
  WordpressMaintenance,
  CTA,
  Footer,
} from "@/components/sections";


export const metadata: Metadata = {
  title: "Wordpress Maintenance Company",
  description:
    "Wordpress Maintenance  services.",
};

export default function WordpressMaintenances() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WordpressMaintenance />
      <CTA />
      <Footer />
    </main>
  );
}
