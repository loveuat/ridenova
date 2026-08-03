'use client'

import { useState, useEffect } from 'react'
import { ServiceCard, FeatureCard, DestinationCard, TestimonialCard, StatCard } from '@/components/sections/cards'
import { 
  Car, Shield, Clock, MapPin, Users, Zap, Award, TrendingUp,
  Headphones, DollarSign, CheckCircle, Navigation, CarFront 
} from 'lucide-react'
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
{/* Why Choose Us */}
export function ServicesCards() {
  const services = [
  {
    key: "localTaxi",
    icon: "mdi:car",
  },
  {
    key: "outstation",
    icon: "mdi:map-marker",
  },
  {
    key: "hourlyRental",
    icon: "mdi:clock-outline",
  },
  {
    key: "airportTransfer",
    icon: "mdi:airplane",
  },
  {
    key: "corporateTravel",
    icon: "mdi:account-group",
  },
  {
    key: "weddingCar",
    icon: "mdi:car-limousine",
  },
];
const servicest = useTranslations("OurServices");
  return (
       <section className="py-16 md:py-24 hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {servicest('topheading')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {servicest('subheading')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/*<ServiceCard
                icon={<Car className="w-6 h-6" />}
                title="Local Taxi"
                description="Quick and reliable service for local city travel"
                features={['Competitive rates', 'Professional drivers', 'Instant booking']}
              />
              <ServiceCard
                icon={<MapPin className="w-6 h-6" />}
                title="Outstation"
                description="Comfortable journey for inter-city and outstation trips"
                features={['Long-distance comfort', 'Fuel efficient', 'Expert drivers']}
              />
              <ServiceCard
                icon={<Clock className="w-6 h-6" />}
                title="Hourly Rental"
                description="Flexible hourly rental for short-duration needs"
                features={['Flexible hours', 'By the minute pricing', 'No commitments']}
              />
              <ServiceCard
                icon={<Navigation className="w-6 h-6" />}
                title="Airport Transfer"
                description="Stress-free airport pickup and drop services"
                features={['Flight tracking', 'Punctual service', 'Extra luggage space']}
              />
              <ServiceCard
                icon={<Users className="w-6 h-6" />}
                title="Corporate Travel"
                description="Dedicated solutions for business and corporate needs"
                features={['Monthly contracts', 'Priority support', 'Billing flexibility']}
              />
              <ServiceCard
                icon={<Award className="w-6 h-6" />}
                title="Wedding Car"
                description="Premium luxury cars for special occasions"
                features={['Luxury vehicles', 'Professional chauffeurs', 'Customized packages']}
              />*/}
              {services.map((service) => (
    <ServiceCard
      key={service.key}
      icon={
        <Icon
          icon={service.icon}
          className="w-6 h-6"
        />
      }
      title={servicest(`${service.key}.title`)}
      description={servicest(
        `${service.key}.description`
      )}
      features={servicest.raw(
        `${service.key}.features`
      )}
    />
  ))}
            </div>
          </div>
        </section>
  )
}
  