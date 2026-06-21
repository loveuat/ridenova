"use client";

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingForm } from '@/components/sections/booking-form'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Image Slider */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=600&fit=crop"
            alt="Premium Car Rental"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Trusted by thousands of travelers</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Reliable Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cta">&</span> Outstation Car Rental
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Book your taxi in seconds. Professional drivers, sanitized cars, GPS tracking, and 24/7 support for a safe and comfortable journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/#booking-form">
                <Button className="bg-primary border-success text-success hover:bg-success hover:text-success-foreground h-12 px-8 text-lg">
                  Book Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
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
                <p className="text-2xl font-bold text-primary">5K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Trips Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">8+</p>
                <p className="text-sm text-muted-foreground">Years Service</p>
              </div>
            </div>
          </div>

          {/* Right - Feature Highlights */}
          <div className="z-10 space-y-4">
            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  🚗
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Diverse Fleet</h3>
                  <p className="text-sm text-muted-foreground">Hatchback, Sedan, SUV, Innova, Ertiga, Tempo & Luxury options</p>
                </div>
              </div>
            </div>

            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  👨‍✈️
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Professional Drivers</h3>
                  <p className="text-sm text-muted-foreground">Experienced, courteous, and background verified for your safety</p>
                </div>
              </div>
            </div>

            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  🗺️
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">GPS Tracking</h3>
                  <p className="text-sm text-muted-foreground">Real-time location tracking and live route updates</p>
                </div>
              </div>
            </div>

            <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">24x7 Support</h3>
                  <p className="text-sm text-muted-foreground">Round the clock customer support for peace of mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

{/* Booking Form Section */}
export function BookingSection() {
  return (
    <section id="booking-form" className="py-12 md:py-20 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Ride in Seconds
          </h2>
          <p className="text-lg text-muted-foreground">
            Fill in the details below and we&apos;ll confirm your booking instantly
          </p>
        </div>

        <div className="bg-primary rounded-2xl border border-border p-8 shadow-lg">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
