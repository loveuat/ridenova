"use client";

import Image from 'next/image'
//import Link from 'next/link'
import { Car, ArrowRight, Phone, CarFront, ArrowDown} from 'lucide-react'
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button'
import { BookingForm } from '@/components/sections/booking-form'
import { Icon } from "@iconify/react";
import { ColourfulWords } from "@/components/ui/colorful-words";
import LocalizedLink from '@/components/sections/localizedlink';
import {ScrollToBooking}  from '@/components/sections/scroll-indicator';
import { useTranslations } from "next-intl";
export function Hero() {
  const herot = useTranslations("Hero");
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-25 pb-20">
      {/* Background Image Slider */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          {/*<Image
            src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=600&fit=crop"
            alt="Premium Car Rental"
            fill
            className="object-cover"
            priority
          />*/}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">{herot("topheading")}</span>
              </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            <ColourfulWords text={herot("brand")} /> {herot("heading")}{" "}
            
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              {herot("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <LocalizedLink href="/#booking-form">
                <div className="flex justify-center">
                <div className="relative inline-flex">
                  {/* Pulse glow */}
                  <span className="absolute inset-0 rounded-xl animate-cta-pulse bg-primary" />

                  {/* Actual Button */}
                  <Button
                    className="group relative h-14 px-10 min-w-[220px] text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {herot("cta")}
                    <Car className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              </LocalizedLink>
              {/* <a href="tel:+919876543210">
                <Button variant="outline" className="border-success text-success hover:bg-success hover:text-success-foreground h-12 px-8 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Driver
                </Button>
              </a> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">{herot("trust1")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">{herot("trust2")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">2+</p>
                <p className="text-sm text-muted-foreground">{herot("trust3")}</p>
              </div>
            </div>
          </div>

          {/* Right - Feature Highlights */}
          <div className="z-10 space-y-4">
            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border-primary p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon
                  icon="streamline-stickies-color:safety"
                  className="w-10 h-10 text-[#000000]"
                />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{herot("heroservices.safety")}</h3>
                  <p className="text-sm text-muted-foreground">{herot("heroservices.safetymessage")}</p>
                </div>
              </div>
            </div>

            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border-primary p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon
                  icon="twemoji:man-police-officer-medium-dark-skin-tone"
                  className="w-10 h-10 text-[#000000]"
                />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{herot("heroservices.professional")}</h3>
                  <p className="text-sm text-muted-foreground">{herot("heroservices.professionalmessage")}</p>
                </div>
              </div>
            </div>

            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border-primary p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon
                  icon="noto-v1:ticket"
                  className="w-10 h-10 text-[#000000]"
                />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{herot("heroservices.easybooking")}</h3>
                  <p className="text-sm text-muted-foreground">{herot("heroservices.easybookingmessage")}</p>
                </div>
              </div>
            </div>

            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border-primary p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon
                  icon="streamline-plump-color:call-center-support-service"
                  className="w-10 h-10 text-[#000000]"
                />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{herot("heroservices.support")}</h3>
                  <p className="text-sm text-muted-foreground">{herot("heroservices.supportmessage")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollToBooking />
    </section>
  )
}

{/* Booking Form Section */}
export function BookingSection() {
  const herot = useTranslations("Hero");
  return (
    <section id="booking-form" className="py-12 md:py-20 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {herot("formheading")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {herot("formsubheading")}
          </p>
        </div>

        <div className="bg-primary rounded-2xl border border-border-primary p-8 shadow-lg">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
