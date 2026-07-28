import { MetadataRoute } from "next";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let routes = [];

  try {
    const res = await fetch(`${API}/api/v1/popular-routes`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      routes = await res.json();
    }
  } catch (error) {
    console.error(error);
  }

  return [
    {
      url: "https://tripmitrago.in",
      lastModified: new Date(),
      priority: 1,
    },

    {
      url: "https://tripmitrago.in/privacy-policy",
      lastModified: new Date(),
    },

    {
      url: "https://tripmitrago.in/terms-and-conditions",
      lastModified: new Date(),
    },

    ...routes.map((route: any) => ({
      url: `https://tripmitrago.in/routes/${route.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}