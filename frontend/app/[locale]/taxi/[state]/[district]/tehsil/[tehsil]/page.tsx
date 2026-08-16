import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LocationBanner } from "@/components/sections/locationbanner";
import {
  Navbar,
  BookingSection,
  CTA,
  Footer
} from "@/components/sections";

interface PageProps {
  params: Promise<{
    locale: string;
    state: string;
    district: string;
    tehsil: string;
  }>;
}

async function getTehsil(districtSlug: string, tehsilSlug: string, locale: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/areas/district/${districtSlug}/tehsil/${tehsilSlug}?lang=${locale}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) return null;
  return response.json();
}

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, district, tehsil } = await params;
  const data = await getTehsil(district, tehsil, locale);

  if (!data) return {};

  const stateSlug = slugify(data.state);
  const pageUrl = `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.district_slug}/tehsil/${data.slug}`;

  const title =
    locale === "hi"
      ? `${data.name} तहसील में टैक्सी सेवा | Trip Mitra Go`
      : `Taxi Service in ${data.name} Tehsil | Trip Mitra Go`;

  const description =
    locale === "hi"
      ? `${data.name} तहसील, ${data.district} के सभी गाँवों में विश्वसनीय टैक्सी सेवा। आउटस्टेशन, एयरपोर्ट ट्रांसफर और लोकल कैब बुकिंग।`
      : `Book reliable taxi service across all villages of ${data.name} tehsil, ${data.district}. Outstation cabs, airport transfers and local taxi booking with Trip Mitra Go.`;

  return {
    title,
    description,
    keywords: [data.name, data.district, data.state, "Taxi Service", "Cab Booking", "Trip Mitra Go"],
    alternates: {
      canonical: pageUrl,
      languages: {
        en: pageUrl.replace("/hi/", "/en/"),
        hi: pageUrl.replace("/en/", "/hi/"),
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Trip Mitra Go",
      locale,
      type: "website",
      images: [{ url: "https://tripmitrago.in/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://tripmitrago.in/og-image.jpg"],
    },
  };
}

export default async function TehsilPage({ params }: PageProps) {
  const { locale, district, tehsil } = await params;
  const data = await getTehsil(district, tehsil, locale);

  if (!data) notFound();

  const stateSlug = slugify(data.state);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.district_slug}/tehsil/${data.slug}`,
    name: `Trip Mitra Go - ${data.name} Tehsil`,
    url: `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.district_slug}/tehsil/${data.slug}`,
    image: "https://tripmitrago.in/tmglogo.webp",
    description:
      locale === "hi"
        ? `${data.name} तहसील के सभी गाँवों में टैक्सी सेवा।`
        : `Taxi service available across all villages of ${data.name} tehsil.`,
    telephone: "+91XXXXXXXXXX",
    priceRange: "₹₹",
    areaServed: {
      "@type": "AdministrativeArea",
      name: data.name,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: data.state,
      addressLocality: data.district,
      addressCountry: "India",
    },
    provider: {
      "@type": "Organization",
      name: "Trip Mitra Go",
      url: "https://tripmitrago.in",
      logo: "https://tripmitrago.in/tmglogo.webp",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "hi" ? "होम" : "Home",
        item: `https://tripmitrago.in/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.state,
        item: `https://tripmitrago.in/${locale}/taxi/${stateSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.district,
        item: `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.district_slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: data.name,
        item: `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.district_slug}/tehsil/${data.slug}`,
      },
    ],
  };

  const faqs = [
    {
      question:
        locale === "hi"
          ? `${data.name} तहसील में टैक्सी कैसे बुक करें?`
          : `How can I book a taxi in ${data.name} tehsil?`,
      answer:
        locale === "hi"
          ? `आप Trip Mitra Go पर ऑनलाइन ${data.name} तहसील के किसी भी गाँव के लिए टैक्सी बुक कर सकते हैं।`
          : `You can book a taxi to any village in ${data.name} tehsil online through Trip Mitra Go.`,
    },
    {
      question:
        locale === "hi"
          ? "क्या आउटस्टेशन टैक्सी उपलब्ध है?"
          : "Do you provide outstation taxi services?",
      answer:
        locale === "hi"
          ? "हाँ, हम वन-वे और राउंड ट्रिप दोनों सेवाएँ प्रदान करते हैं।"
          : "Yes, we provide one-way and round-trip taxi services.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-background">
        <Navbar />

        <LocationBanner
          imageUrl={data.banner_image}
          title={`${data.name} Tehsil`}
          subtitle={`${data.district}, ${data.state}`}
        />

        <BookingSection />

        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{data.name} Tehsil</h1>
          <p className="text-muted-foreground mb-8">
            {locale === "hi"
              ? `${data.village_count} गाँव — ${data.district}, ${data.state}`
              : `${data.village_count} villages in ${data.district} district, ${data.state}`}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {data.villages.map((v: any) => (
              <Link
                key={v.id}
                href={`/${locale}/taxi/${stateSlug}/${data.district_slug}/${v.slug}`}
                className="text-sm px-3 py-2 rounded-md border hover:bg-muted truncate"
              >
                {v.name}
              </Link>
            ))}
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 mt-20">
          <h2 className="text-3xl font-bold mb-8">
            {locale === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <CTA />
        <Footer />
      </main>
    </>
  );
}