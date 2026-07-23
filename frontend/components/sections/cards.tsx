import { ReactNode } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  features?: string[]
}

export function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="group h-full bg-card rounded-xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 bg-primary/10 from-accent to-cta rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {features && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary/10 drop-shadow-lg from-accent/20 to-cta/20 rounded-xl flex items-center justify-center text-accent mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

interface DestinationCardProps {
  image: string
  from: string
  to: string
  price: string
  distance?: string
  duration?: string
}

export function DestinationCard({ image, from, to, price, distance, duration }: DestinationCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent hover:shadow-lg transition-all duration-300">
      <div className="relative h-40 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={`${from} to ${to}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-4">
        <h4 className="font-bold text-foreground mb-1">{from} → {to}</h4>
        {distance && <p className="text-xs text-muted-foreground mb-3">{distance} km • {duration}</p>}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold text-accent">{price}</p>
          </div>
          <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            Details
          </Button>
        </div>
      </div>
    </div>
  )
}

interface FleetCardProps {
  image: string
  name: string
  seats: number
  luggage: string
  ac: boolean
  fuel: string
}

export function FleetCard({ image, name, seats, luggage, ac, fuel }: FleetCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h4 className="font-bold text-foreground mb-3">{name}</h4>
        <div className="space-y-2 text-sm mb-4">
          <p className="text-muted-foreground">👥 {seats} Seats</p>
          <p className="text-muted-foreground">🧳 {luggage} Luggage</p>
          <p className="text-muted-foreground">{ac ? '❄️ AC' : '🌡️ Non-AC'}</p>
          <p className="text-muted-foreground">⛽ {fuel}</p>
        </div>
        <Button className="w-full bg-cta hover:bg-cta/90 text-cta-foreground">
          Book Now
        </Button>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  image: string
  name: string
  title: string
  review: string
  rating: number
}

export function TestimonialCard({ image, name, title, review, rating }: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
      <p className="text-foreground mb-4 italic">"{review}"</p>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  )
}

interface StatProps {
  number: string
  label: string
  suffix?: string
}

export function StatCard({ number, label, suffix }: StatProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
        {number}{suffix}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}
