import { NextResponse } from "next/server"
import { BASE_URL, LOCALES, urlXml, wrapUrlset } from "@/lib/sitemap-helpers"

export async function GET() {
  const staticPaths = ["", "/about", "/contact", "/taxi"]
  const urls = LOCALES.flatMap((locale) =>
    staticPaths.map((p) => urlXml(`${BASE_URL}/${locale}${p}`, p === "" ? 1.0 : 0.7, "weekly"))
  )

  return new NextResponse(wrapUrlset(urls), {
    headers: { "Content-Type": "application/xml" },
  })
}