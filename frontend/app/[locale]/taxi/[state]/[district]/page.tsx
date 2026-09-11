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
  }>;
}

async function getDistrict(districtSlug: string, locale: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/areas/district/${districtSlug}?lang=${locale}`,
    { next: { revalidate: 604800 } }
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
  const { locale, district } = await params;
  const data = await getDistrict(district, locale);

  if (!data) return {};

  const stateSlug = slugify(data.state);
  const pageUrl = `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.slug}`;

  const title =
    locale === "hi"
      ? `${data.name} जिले में टैक्सी सेवा | Trip Mitra Go`
      : `Taxi Service in ${data.name} District | Trip Mitra Go`;

  const description =
    locale === "hi"
      ? `${data.name}, ${data.state} के सभी तहसीलों और गाँवों में विश्वसनीय टैक्सी सेवा। आउटस्टेशन, एयरपोर्ट ट्रांसफर और लोकल कैब बुकिंग।`
      : `Book reliable taxi service across all tehsils and villages of ${data.name}, ${data.state}. Outstation cabs, airport transfers and local taxi booking with Trip Mitra Go.`;

  return {
    title,
    description,
    keywords: [data.name, data.state, "Taxi Service", "Cab Booking", "Trip Mitra Go"],
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

export default async function DistrictPage({ params }: PageProps) {
  const { locale, state, district } = await params;
  const data = await getDistrict(district, locale);

  if (!data) notFound();

  const stateSlug = slugify(data.state);

  // Group villages by tehsil for section display
  const byTehsil: Record<string, any[]> = {};
  for (const v of data.villages) {
    const tehsilName = v.hierarchy?.[0] || "Other";
    if (!byTehsil[tehsilName]) byTehsil[tehsilName] = [];
    byTehsil[tehsilName].push(v);
  }
  const tehsilEntries = Object.entries(byTehsil);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.slug}`,
    name: `Trip Mitra Go - ${data.name} District`,
    url: `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.slug}`,
    image: "https://tripmitrago.in/tmglogo.webp",
    description:
      locale === "hi"
        ? `${data.name} जिले के सभी क्षेत्रों में टैक्सी सेवा।`
        : `Taxi service available across all areas of ${data.name} district.`,
    telephone: "+91XXXXXXXXXX",
    priceRange: "₹₹",
    areaServed: {
      "@type": "AdministrativeArea",
      name: data.name,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: data.state,
      addressLocality: data.name,
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
        name: data.name,
        item: `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${data.slug}`,
      },
    ],
  };

  const faqs = [
    {
      question:
        locale === "hi"
          ? `${data.name} जिले में टैक्सी कैसे बुक करें?`
          : `How can I book a taxi in ${data.name} district?`,
      answer:
        locale === "hi"
          ? `आप Trip Mitra Go पर ऑनलाइन ${data.name} की किसी भी तहसील या गाँव के लिए टैक्सी बुक कर सकते हैं।`
          : `You can book a taxi to any tehsil or village in ${data.name} online through Trip Mitra Go.`,
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
          title={`${data.name} District`}
          subtitle={data.state}
        />

        {/*<BookingSection />*/}

        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{data.name} District</h1>
          <p className="text-muted-foreground mb-8">
            {locale === "hi"
              ? `${data.village_count} गाँव, ${tehsilEntries.length} तहसीलों में — ${data.state}`
              : `${data.village_count} villages across ${tehsilEntries.length} tehsils in ${data.state}`}
          </p>

          {tehsilEntries.map(([tehsilName, villages]) => (
            <div key={tehsilName} className="mb-10">
              <h2 className="text-xl font-semibold mb-3">
                <Link
                  href={`/${locale}/taxi/${stateSlug}/${data.slug}/tehsil/${slugify(tehsilName)}`}
                  className="hover:underline"
                >
                  {tehsilName} Tehsil
                </Link>
                <span className="text-sm text-muted-foreground ml-2">({villages.length})</span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {villages.slice(0, 12).map((v) => (
                  <Link
                    key={v.id}
                    href={`/${locale}/taxi/${stateSlug}/${data.slug}/${v.slug}`}
                    className="text-sm px-3 py-2 rounded-md border hover:bg-muted truncate"
                  >
                    {v.name}
                  </Link>
                ))}
              </div>

              {villages.length > 12 && (
                <Link
                  href={`/${locale}/taxi/${stateSlug}/${data.slug}/tehsil/${slugify(tehsilName)}`}
                  className="text-sm text-primary hover:underline mt-2 inline-block"
                >
                  {locale === "hi" ? "सभी देखें →" : `View all ${villages.length} →`}
                </Link>
              )}
            </div>
          ))}
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