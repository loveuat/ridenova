import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    locale: string;
    state: string;
    district: string;
    slug: string;
  }>;
}

async function getLocation(slug: string, locale: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/locations/${slug}?lang=${locale}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const location = await getLocation(slug, locale);

  if (!location) {
    return {};
  }

  const stateSlug = location.state
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  const districtSlug = location.district
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  const pageUrl = `https://tripmitrago.in/${locale}/taxi/${stateSlug}/${districtSlug}/${location.slug}`;

  const title =
    location.seo_title ??
    (locale === "hi"
      ? `${location.name} में टैक्सी सेवा | Trip Mitra Go`
      : `Taxi Service in ${location.name} | Trip Mitra Go`);

  const description =
    location.seo_description ??
    (locale === "hi"
      ? `${location.name}, ${location.district} में विश्वसनीय टैक्सी सेवा। एयरपोर्ट ट्रांसफर, आउटस्टेशन टैक्सी, लोकल कैब और 24×7 बुकिंग।`
      : `Book reliable taxi service in ${location.name}, ${location.district}. Airport transfer, outstation cab, local taxi and 24×7 booking with Trip Mitra Go.`);

  return {
    title,
    description,

    keywords:
      location.keywords ??
      [
        location.name,
        location.district,
        location.state,
        "Taxi Service",
        "Cab Booking",
        "Trip Mitra Go",
      ],

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
      images: [
        {
          url:
            location.banner_image ??
            "https://tripmitrago.in/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        location.banner_image ??
          "https://tripmitrago.in/og-image.jpg",
      ],
    },
  };
}

export default async function LocationPage({
  params,
}: PageProps) {
  const { locale, slug } = await params;

  const location = await getLocation(slug, locale);

  if (!location) {
    notFound();
  }
  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `https://tripmitrago.in/${locale}/taxi/${location.state.toLowerCase().replace(/\s+/g, "-")}/${location.district.toLowerCase().replace(/\s+/g, "-")}/${location.slug}`,

  name: `Trip Mitra Go - ${location.name}`,

  url: `https://tripmitrago.in/${locale}/taxi/${location.state.toLowerCase().replace(/\s+/g, "-")}/${location.district.toLowerCase().replace(/\s+/g, "-")}/${location.slug}`,

  image:
    location.banner_image ??
    "https://tripmitrago.in/tmglogo.webp",

  description:
    location.seo_description ??
    `Book reliable taxi service in ${location.name}.`,

  telephone: "+91XXXXXXXXXX",

  priceRange: "₹₹",

  areaServed: {
    "@type": "City",
    name: location.name,
  },

  address: {
    "@type": "PostalAddress",
    addressCountry: location.country,
    addressRegion: location.state,
    addressLocality: location.district,
    postalCode: location.pincode,
  },

  geo:
    location.latitude && location.longitude
      ? {
          "@type": "GeoCoordinates",
          latitude: location.latitude,
          longitude: location.longitude,
        }
      : undefined,

  provider: {
    "@type": "Organization",
    name: "Trip Mitra Go",
    url: "https://tripmitrago.in",
    logo: "https://tripmitrago.in/tmglogo.webp",
  },
};
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>
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
      name: location.state,
      item: `https://tripmitrago.in/${locale}/taxi/${location.state
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    },

    {
      "@type": "ListItem",
      position: 3,
      name: location.district,
      item: `https://tripmitrago.in/${locale}/taxi/${location.state
        .toLowerCase()
        .replace(/\s+/g, "-")}/${location.district
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    },

    {
      "@type": "ListItem",
      position: 4,
      name: location.name,
      item: `https://tripmitrago.in/${locale}/taxi/${location.state
        .toLowerCase()
        .replace(/\s+/g, "-")}/${location.district
        .toLowerCase()
        .replace(/\s+/g, "-")}/${location.slug}`,
    },
  ],
};
  return (
    <main className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-4">
          {location.name}
        </h1>

        <p className="text-muted-foreground mb-8">
          {location.district}, {location.state}
        </p>

        {location.content && (
          <div className="prose max-w-none">
            {location.content}
          </div>
        )}

      </div>
    </main>
  );
}