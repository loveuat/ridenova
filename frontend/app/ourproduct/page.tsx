import {
  Navbar,
  Hero,
  OurProducts ,
  CTA,
 Footer,
} from "@/components/sections";

export const metadata = {
  title: "Our Products | Business Software & Digital Solutions",

  description:
    "Explore our innovative software products including Resume Builders, Business Management Tools, Web Applications, SaaS Solutions and custom digital products designed to help businesses grow.",
};

export default  function OurServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <OurProducts />
      <CTA />
     <Footer />
    </main>
  );
}


