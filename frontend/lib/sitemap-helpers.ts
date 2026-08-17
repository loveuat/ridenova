export const CHUNK_SIZE = 40000
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tripmitrago.in"
export const LOCALES = ["en", "hi"]

export type VillageEntry = {
  slug: string
  district_slug: string | null
  state_slug: string | null
  updated_at: string | null
}

export type AreaEntry = {
  slug: string
  district_slug?: string | null
  state_slug?: string | null
}

export async function fetchJSON<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TMG_API_URL}${path}`, {
      cache: "no-store",
    })
    if (!res.ok) return [] as unknown as T
    return res.json()
  } catch (err) {
    console.error(`Sitemap fetch failed for ${path}:`, err)
    return [] as unknown as T
  }
}

export function urlXml(loc: string, priority: number, freq: string, lastmod?: string) {
  return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<changefreq>${freq}</changefreq><priority>${priority}</priority></url>`
}

export function wrapUrlset(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`
}