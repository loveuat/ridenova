'use client'

import { useState, useEffect } from 'react'
import { ServiceCard, FeatureCard, DestinationCard, TestimonialCard, StatCard } from '@/components/sections/cards'
import { 
  Car, Shield, Clock, MapPin, Users, Zap, Award, TrendingUp,
  Headphones, DollarSign, CheckCircle, Navigation
} from 'lucide-react'

{/* Why Choose Us */}

  return (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose Elite Cabs?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide premium car rental services with unmatched quality and customer satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Shield className="w-8 h-8" />}
                title="Professional Drivers"
                description="Verified and experienced drivers with excellent track records"
              />
              <FeatureCard
                icon={<Zap className="w-8 h-8" />}
                title="Sanitized Cars"
                description="All vehicles regularly sanitized and maintained to highest standards"
              />
              <FeatureCard
                icon={<Headphones className="w-8 h-8" />}
                title="24x7 Support"
                description="Round-the-clock customer support for any assistance you need"
              />
              <FeatureCard
                icon={<Navigation className="w-8 h-8" />}
                title="GPS Enabled"
                description="Advanced GPS tracking for safe and efficient journey monitoring"
              />
              <FeatureCard
                icon={<DollarSign className="w-8 h-8" />}
                title="Affordable Pricing"
                description="Best rates in market with transparent billing and no hidden charges"
              />
              <FeatureCard
                icon={<CheckCircle className="w-8 h-8" />}
                title="Corporate Billing"
                description="Flexible payment options with monthly contracts and invoicing"
              />
              <FeatureCard
                icon={<Clock className="w-8 h-8" />}
                title="Instant Booking"
                description="Quick and easy booking process in just a few seconds"
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8" />}
                title="Safe Journey"
                description="Premium safety features and emergency support services"
              />
            </div>
          </div>
        </section>
  )