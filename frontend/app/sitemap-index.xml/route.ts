import { NextResponse } from "next/server"
import { BASE_URL, CHUNK_SIZE, VillageEntry, fetchJSON } from "@/lib/sitemap-helpers"

export async function GET() {
  const villages = await fetchJSON<VillageEntry[]>("/api/v1/sitemap/villages")
  const villageChunkCount = Math.max(1, Math.ceil(villages.length / CHUNK_SIZE))

  const entries = [
    `${BASE_URL}/sitemap-static.xml`,
    `${BASE_URL}/sitemap-areas.xml`,
    `${BASE_URL}/sitemap-routes.xml`,
    ...Array.from({ length: villageChunkCount }, (_, i) => `${BASE_URL}/sitemap-villages/${i}.xml`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((url) => `<sitemap><loc>${url}</loc></sitemap>`).join("\n")}
</sitemapindex>`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}