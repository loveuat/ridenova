import { NextResponse } from "next/server"
import { BASE_URL, LOCALES, AreaEntry, fetchJSON, urlXml, wrapUrlset } from "@/lib/sitemap-helpers"

export async function GET() {
  const districts = await fetchJSON<AreaEntry[]>("/api/v1/sitemap/districts")
  const districtUrls = LOCALES.flatMap((locale) =>
    districts
      .filter((d) => d.state_slug)
      .map((d) => urlXml(`${BASE_URL}/${locale}/taxi/${d.state_slug}/${d.slug}`, 0.8, "weekly"))
  )

  const tehsils = await fetchJSON<AreaEntry[]>("/api/v1/sitemap/tehsils")
  const tehsilUrls = LOCALES.flatMap((locale) =>
    tehsils
      .filter((t) => t.district_slug && t.state_slug)
      .map((t) =>
        urlXml(`${BASE_URL}/${locale}/taxi/${t.state_slug}/${t.district_slug}/tehsil/${t.slug}`, 0.7, "weekly")
      )
  )

  return new NextResponse(wrapUrlset([...districtUrls, ...tehsilUrls]), {
    headers: { "Content-Type": "application/xml" },
  })
}