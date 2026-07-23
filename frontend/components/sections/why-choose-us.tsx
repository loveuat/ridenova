'use client'

import { useState, useEffect } from 'react'
import { ServiceCard, FeatureCard, DestinationCard, TestimonialCard, StatCard } from '@/components/sections/cards'
import { 
  Car, Shield, Clock, MapPin, Users, Zap, Award, TrendingUp,
  Headphones, DollarSign, CheckCircle, Navigation, CarFront 
} from 'lucide-react'
import { Icon } from "@iconify/react";

{/* Why Choose Us */}
export function WhyChooseUs() {
  return (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose Trip Mitra?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide premium car rental services with unmatched quality and customer satisfaction across the centra india
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
              icon={
                <Icon
                  icon="twemoji:police-officer-medium-light-skin-tone"
                  className="w-10 h-10"
                />
              }
              title="Professional Drivers"
              description="Verified and experienced drivers with excellent track records"
            />
              <FeatureCard
                icon={
                <Icon
                  icon="openmoji:sanitizer-spray"
                  className="w-10 h-10"
                />
              }
                title="Sanitized Cars"
                description="All vehicles regularly sanitized and maintained to highest standards"
              />
              <FeatureCard
                icon={
                <Icon
                  icon="flat-color-icons:online-support"
                  className="w-10 h-10 text-primary"
                />
              }
                title="24x7 Support"
                description="Round-the-clock customer support for any assistance you need"
              />
              <FeatureCard
               icon={
                <Icon
                  icon="marketeq:gps-fixed"
                  className="w-10 h-10 text-primary"
                />
              }
                title="GPS Enabled"
                description="Advanced GPS tracking for safe and efficient journey monitoring"
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="tabler:currency-rupee-nepalese"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title="Affordable Pricing"
                description="Best rates in market with transparent billing and no hidden charges"
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="gcp:billing"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title="Corporate Billing"
                description="Flexible payment options with monthly contracts and invoicing"
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="noto-v1:ticket"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title="Instant Booking"
                description="Quick and easy booking process in just a few seconds"
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="twemoji:shield"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title="Safe Journey"
                description="Premium safety features and emergency support services"
              />
            </div>
          </div>
        </section>
  )
}
  