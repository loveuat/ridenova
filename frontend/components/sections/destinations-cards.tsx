'use client'

import { useEffect, useState } from 'react'
import { DestinationCard } from '@/components/sections/cards'
import { ColourfulWords } from "@/components/ui/colorful-words";
interface PopularRoute {
  id: number
  image: string | null
  from_city: string
  to_city: string
  price: number
  distance: string
  trip_time: string
}

export function DestinationsCards() {
  const [routes, setRoutes] = useState<PopularRoute[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPopularRoutes = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/popular-routes`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch popular routes')
        }

        const data = await response.json()

        setRoutes(data)
      } catch (error) {
        console.error('Popular routes error:', error)
        setError('Unable to load popular routes.')
      } finally {
        setLoading(false)
      }
    }

    fetchPopularRoutes()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Routes
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our most requested destinations
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[350px] rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && routes.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No popular routes available at the moment.
            </p>
          </div>
        )}

        {/* Routes */}
        {!loading && !error && routes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <DestinationCard
                key={route.id}
                image={
                  route.image?.startsWith("http")
                    ? route.image
                    : "/images/default-route.jpg"
                }
                from={route.from_city}
                to={route.to_city}
                price={`₹${route.price.toLocaleString('en-IN')}`}
                distance={route.distance}
                duration={route.trip_time}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}