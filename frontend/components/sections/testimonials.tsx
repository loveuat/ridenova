"use client";

import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CTO, TechVentures",
    content:
      "SmartWorking transformed our engineering team. We hired 3 senior developers in just 2 weeks, and they&apos;ve been exceptional. The cost savings allowed us to expand faster than planned.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "James Chen",
    role: "Founder, DataPulse",
    content:
      "The quality of developers is outstanding. Our SmartWorking team members integrate seamlessly with our in-house staff. It&apos;s like they&apos;ve been with us for years.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Emily Roberts",
    role: "VP Engineering, CloudScale",
    content:
      "We&apos;ve tried other remote hiring platforms, but SmartWorking&apos;s vetting process is unmatched. Every developer we&apos;ve hired has exceeded expectations.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Michael Brown",
    role: "Engineering Lead, FinTech Co",
    content:
      "The onboarding process was seamless. Our new developers were productive from day one. Highly recommend SmartWorking for any tech company looking to scale.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Lisa Thompson",
    role: "CTO, StartupX",
    content:
      "SmartWorking helped us build our entire engineering team from scratch. The quality and dedication of their developers is truly impressive.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            What Our Clients Say
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          className="pb-14"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="h-full">
                <div
                  className="bg-card rounded-2xl p-8 border border-border
                              hover:border-primary/30 transition-all duration-300
                              h-full flex flex-col"
                >
                  <Quote className="w-10 h-10 text-primary/30 mb-4" />

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>

                  {/* pushed to bottom */}
                  <div className="flex items-center gap-4 mt-auto">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
