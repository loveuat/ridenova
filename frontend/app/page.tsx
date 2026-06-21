import { Metadata } from "next";
import Script from "next/script";

import {
  Navbar,
  Hero,
  TrustedBy,
  TrustBadges,
  WhatWeOffer,
  HowItWorks,
  DeveloperCards,
  PricingComparison,
  TestimonialEmblaSlider,
  CTA,
  Footer,
  ValuesSection,
  PortfolioSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Web Development Company | WordPress, Next.js & SEO Services",
  description:
    "Atulya IT Solutions provides Web Development, WordPress Development, Next.js Development, SEO Services, Website Maintenance and Digital Marketing solutions.",
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Atulya IT Solutions",
  url: "https://atulyaitsolutions.com",
  logo: "https://atulyaitsolutions.com/aislogo.webp",
  description:
    "Web Development, WordPress Development, Next.js Development and SEO Services.",
  sameAs: [
    "https://www.linkedin.com/in/atulya-it-solutions/",
    "https://www.facebook.com/people/Atulya-It-Solutions/100071791771830/",
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <TrustedBy />
        <TrustBadges />
        <WhatWeOffer />
        <HowItWorks />
        <DeveloperCards />
        <ValuesSection />
        <PortfolioSection />
        <PricingComparison />
        <TestimonialEmblaSlider />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
