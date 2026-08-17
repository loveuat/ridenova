import { NextResponse, NextRequest } from "next/server"
import { BASE_URL, LOCALES, CHUNK_SIZE, VillageEntry, fetchJSON, urlXml, wrapUrlset } from "@/lib/sitemap-helpers"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ chunk: string }> }
) {
  const { chunk } = await params
  const chunkIndex = parseInt(chunk.replace(".xml", ""), 10)

  if (isNaN(chunkIndex) || chunkIndex < 0) {
    return new NextResponse("Invalid chunk", { status: 400 })
  }

  const villages = await fetchJSON<VillageEntry[]>("/api/v1/sitemap/villages")
  const start = chunkIndex * CHUNK_SIZE
  const slice = villages.slice(start, start + CHUNK_SIZE)

  const urls = LOCALES.flatMap((locale) =>
    slice
      .filter((v) => v.district_slug && v.state_slug)
      .map((v) =>
        urlXml(
          `${BASE_URL}/${locale}/taxi/${v.state_slug}/${v.district_slug}/${v.slug}`,
          0.6,
          "monthly",
          v.updated_at || undefined
        )
      )
  )

  return new NextResponse(wrapUrlset(urls), {
    headers: { "Content-Type": "application/xml" },
  })
}