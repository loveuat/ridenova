import {useTranslations} from 'next-intl';
import { Metadata } from "next";
import Script from "next/script";

import {
  Navbar,
  Hero,
  BookingSection,
  WhyChooseUs,
  TrustBadges,
  WhatWeOffer,
  // HowItWorks,
  DestinationsCards,
  //ServicesCards,
  //DeveloperCards,
  PricingComparison,
  TestimonialEmblaSlider,
  CTA,
  Footer,
  //ValuesSection,
  //PortfolioSection,
  //DriveCarSection
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Trip Mitra Go| Car Rental Services",
  description:
    "Atulya IT Solutions provides Web Development, WordPress Development, Next.js Development, SEO Services, Website Maintenance and Digital Marketing solutions.",
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trip Mitra Go",
  url: "https://tripmitrago.in/",
  logo: "https://tripmitrago.in/aislogo.webp",
  description:
    "Book reliable car rental and taxi services in Balaghat with Trip Mitra. Airport transfers, outstation cabs, one-way taxi, wedding cars, corporate travel, Innova Crysta, Tempo Traveller and 24×7 booking across Central India.",
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
        <Navbar/>
        {/*<DriveCarSection />*/}
        <Hero />
        <BookingSection />
        <WhyChooseUs />
        <TrustBadges />
        <WhatWeOffer />
        <DestinationsCards />
        {/*<HowItWorks />*/}
        {/*<DeveloperCards />*/}
        {/*<ValuesSection />*/}
        {/*<PortfolioSection />*/}
        {/*<PricingComparison />*/}
        <TestimonialEmblaSlider />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
