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
export function WhyChooseUs() {
  const whut = useTranslations("WhyChooseUs");
  return (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {whut('topheading')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {whut('subheading')}
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
              title={whut('driver')}
              description={whut('drivermessage')}
            />
              <FeatureCard
                icon={
                <Icon
                  icon="openmoji:sanitizer-spray"
                  className="w-10 h-10"
                />
              }
                title={whut('sanitize')}
                description={whut('sanitizemessage')}
              />
              <FeatureCard
                icon={
                <Icon
                  icon="flat-color-icons:online-support"
                  className="w-10 h-10 text-primary"
                />
              }
                title={whut('support')}
                description={whut('supportmessage')}
              />
              <FeatureCard
               icon={
                <Icon
                  icon="marketeq:gps-fixed"
                  className="w-10 h-10 text-primary"
                />
              }
                title={whut('gps')}
                description={whut('gpsmessage')}
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="tabler:currency-rupee-nepalese"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title={whut('affordable')}
                description={whut('affordablemessage')}
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="gcp:billing"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title={whut('billing')}
                description={whut('billingmessage')}
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="noto-v1:ticket"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title={whut('instant')}
                description={whut('instantmessage')}
              />
              <FeatureCard
                 icon={
                <Icon
                  icon="twemoji:shield"
                  className="w-10 h-10 text-[#0c6fff]"
                />
              }
                title={whut('safe')}
                description={whut('safemessage')}
              />
            </div>
          </div>
        </section>
  )
}
  