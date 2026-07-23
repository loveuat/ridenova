'use client'

import { useState, useEffect } from 'react'
import { ServiceCard, FeatureCard, DestinationCard, TestimonialCard, StatCard } from '@/components/sections/cards'
import { 
  Car, Shield, Clock, MapPin, Users, Zap, Award, TrendingUp,
  Headphones, DollarSign, CheckCircle, Navigation, CarFront 
} from 'lucide-react'
import { Icon } from "@iconify/react";

{/* Why Choose Us */}
export function DestinationsCards() {
  return (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Popular Routes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our most requested destinations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DestinationCard
                image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                from="Lalburra"
                to="Maihar"
                price="₹800"
                distance="65"
                duration="2h 15m"
              />
              <DestinationCard
                image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop"
                from="Lalburra"
                to="Dongargarh"
                price="₹1,200"
                distance="95"
                duration="3h 30m"
              />
              <DestinationCard
                image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                from="Balaghat"
                to="Nagpur Airport"
                price="₹1,500"
                distance="120"
                duration="3h 45m"
              />
              <DestinationCard
                image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop"
                from="Balaghat"
                to="Raipur Airport"
                price="₹2,000"
                distance="180"
                duration="5h"
              />
              <DestinationCard
                image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                from="Balaghat"
                to="Jabalpur"
                price="₹1,100"
                distance="85"
                duration="2h 45m"
              />
              <DestinationCard
                image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop"
                from="Balaghat"
                to="Kanha National Park"
                price="₹1,800"
                distance="150"
                duration="4h 30m"
              />
            </div>
          </div>
        </section>
  )
}
  