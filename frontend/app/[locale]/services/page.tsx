import {
  Navbar,
  Hero,
  ServicesGrid,
  CTA,
 Footer,
} from "@/components/sections";

export const metadata = {
  title: "Web Development, SEO & Website Maintenance Services",
  description:
    "Professional Web Development, WordPress Development, SEO Services, Website Maintenance and Digital Marketing solutions.",
};

export default  function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <CTA/>
     <Footer />
    </main>
  );
}
