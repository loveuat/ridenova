import {
  Code,
  Smartphone,
  Search,
  ShoppingCart,
  LaptopMinimal,
  Brain,
} from "lucide-react";
import { Icon } from "@iconify/react";

const services = [
  {
    step: 1,
    icon: "streamline-stickies-color:taxi",
    title: "Local Taxi",
    description:
      "TripMitra Local Taxi offers safe, reliable, and affordable rides for your everyday travel needs. Book a comfortable taxi for city rides, local errands, airport transfers, and more.",
    highlights: [
      "Competitive rates",
      "Professional drivers",
      "Instant booking",
    ],
  },
  {
    step: 2,
    icon: "streamline-ultimate-color:adventure-car-truck-1",
    title: "Outstation",
    description:
      "TripMitra Outstation provides comfortable, safe, and reliable long-distance travel for family trips, business journeys, and weekend getaways. Enjoy hassle-free intercity rides with professional drivers and well-maintained cars.",
    highlights: ["Long-distance comfort", "Fuel efficient", "Expert drivers"],
  },
  {
    step: 3,
    icon: "openmoji:timer",
    title: "Hourly Rental",
    description:
      "TripMitra Hourly Rental gives you the flexibility to book a car with a professional driver for as many hours as you need. Perfect for meetings, shopping, local sightseeing, events, and multiple stops.",
    highlights: ["Flexible hours","By the minute pricing","No commitments",],
  },
  {
    step: 4,
    icon: "streamline-stickies-color:taxi",
    title: "Airport Transfers",
    description:
      "TripMitra Airport Transfer offers reliable, comfortable, and timely rides to and from the airport. Enjoy stress-free travel with professional drivers and well-maintained cars, available for early-morning flights and late-night arrivals.",
    highlights: [
      "Flight tracking","Punctual service","Mobile Friendly Shopping Experience",],
  },
  {
    step: 5,
    icon: "streamline-plump-color:building-office-flat",
    title: "Corporate Travels",
    description:
      "TripMitra Corporate Travel provides reliable and professional transportation solutions for businesses and corporate travellers. From airport transfers to executive car rentals and intercity business travel, we ensure a smooth and comfortable journey. With dependable service and experienced drivers, TripMitra keeps your business moving with confidence.",
    highlights: ["Monthly contracts","Priority support","Billing flexibility",
    ],
  },

    {
    step: 6,
    icon: "openmoji:autonomous-car",
    title: "Wedding Cars",
    description:
      "TripMitra Wedding Car service adds comfort and elegance to your special day with beautifully maintained cars and professional chauffeurs. Make every wedding journey memorable, stylish, and stress-free.",
    highlights: ["Luxury vehicles","Professional chauffeurs","Customized packages",],
  },
];

export function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive car rental solutions for every need
              </p>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <div
              key={item.step}
              className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mt-2 group-hover:bg-primary/20 transition-colors">
                <Icon
        icon={item.icon}
        className="w-8 h-8"
      />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {item.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
