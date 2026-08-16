'use client'

import Image from "next/image"
import { MapPin } from "lucide-react"

type LocationBannerProps = {
  imageUrl: string | null | undefined
  title: string
  subtitle?: string
}

export function LocationBanner({ imageUrl, title, subtitle }: LocationBannerProps) {
  const fallback = "/images/location-banner-fallback.jpg" // apna default rakh lena public/ me

  return (
   <div className="relative w-full overflow-hidden">
      <Image
        src={imageUrl || fallback}
        alt={title}
        width={1920}
        height={600}
        priority
        sizes="100vw"
        className="w-full h-auto max-h-[600px] object-cover"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
        <div className="flex items-center gap-2 text-white/90">
          <MapPin className="h-5 w-5" />
          {subtitle && <span className="text-sm md:text-base">{subtitle}</span>}
        </div>

        <h1 className="mt-1 text-2xl font-bold text-white md:text-4xl">
          {title}
        </h1>
      </div>
    </div>
  )
}