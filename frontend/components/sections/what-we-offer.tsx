import {
  Code,
  Smartphone,
  Search,
  ShoppingCart,
  LaptopMinimal,
  Brain,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
export function WhatWeOffer() {
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
    <section id="what-we-offer" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
               {servicest('topheading')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {servicest('subheading')}
              </p>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
  <div
    key={item.key}
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
      {servicest(`${item.key}.title`)}
    </h3>

    {/* Description */}
    <p className="text-sm text-muted-foreground mb-4">
      {servicest(`${item.key}.description`)}
    </p>

    {/* Features */}
    <ul className="space-y-2">
      {servicest
        .raw(`${item.key}.features`)
        .map((feature: string, idx: number) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            {feature}
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
