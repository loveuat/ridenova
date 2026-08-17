import { NextResponse } from "next/server"
import { BASE_URL, LOCALES, fetchJSON, urlXml, wrapUrlset } from "@/lib/sitemap-helpers"

type RouteEntry = { slug: string; updated_at: string | null }

export async function GET() {
  const routes = await fetchJSON<RouteEntry[]>("/api/v1/sitemap/routes")

  const urls = LOCALES.flatMap((locale) =>
    routes.map((r) =>
      urlXml(`${BASE_URL}/${locale}/routes/${r.slug}`, 0.6, "monthly", r.updated_at || undefined)
    )
  )

  return new NextResponse(wrapUrlset(urls), {
    headers: { "Content-Type": "application/xml" },
  })
}