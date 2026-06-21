import {
  Code,
  Smartphone,
  Search,
  ShoppingCart,
  LaptopMinimal,
  Brain,
} from "lucide-react";


const services = [
  {
    step: 1,
    icon: Code,
    title: "Web Apps Development",
    description:
      "Transform your ideas into powerful, scalable web applications tailored to your business needs. We build fast, secure, and user-friendly web solutions that improve efficiency, automate workflows, and deliver exceptional user experiences.",
    highlights: [
      "Custom Web Application Development",
      "Responsive & User-Friendly Design",
      "Secure & Scalable Architecture",
    ],
  },
  {
    step: 2,
    icon: Smartphone,
    title: "Mobile Apps Development",
    description:
      "Bring your ideas to life with high-performance mobile applications designed for iOS and Android platforms. We create intuitive, feature-rich, and scalable mobile apps that enhance user engagement, streamline business operations, and deliver seamless experiences across all devices.",
    highlights: ["Custom Mobile App Development", "Cross-Platform Compatibility", "Secure & Scalable Solutions"],
  },
  {
    step: 3,
    icon: Search,
    title: "SEO & Digital Marketing",
    description:
      "Boost your online presence and reach the right audience with data-driven SEO and digital marketing strategies. We help businesses increase website traffic, improve search engine rankings, generate quality leads, and maximize ROI through targeted marketing.",
    highlights: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing (SMM)",
      "Lead Generation & Growth Strategy",
    ],
  },
  {
    step: 4,
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    description:
      "Launch and grow your online business with a powerful, user-friendly e-commerce website. We create secure, scalable, and conversion-focused online stores that provide seamless shopping experiences, streamline operations, and help increase sales across all devices.",
    highlights: [
      "Custom Online Store Development",
      "Secure Payment Gateway Integration",
      "Mobile Friendly Shopping Experience",
    ],
  },
  {
    step: 5,
    icon: LaptopMinimal,
    title: "Technical Education",
    description:
      "Empower your future with industry-focused technical education designed to build practical skills and real-world expertise. Our programs provide hands-on learning, expert guidance, and the latest technology training to help students and professionals stay competitive.",
    highlights: [
      "Industry Relevant Training Programs",
      "Hands On Learning & Practical Projects",
      "Expert Mentorship & Career Support",
    ],
  },

    {
    step: 6,
    icon: Brain,
    title: "AI Training",
    description:
      "Training helps machines learn from data, recognize patterns, and make intelligent decisions. It is the foundation of modern artificial intelligence systems.",
    highlights: [
      "Dedicated support",
      "Regular check-ins",
      "Performance tracking",
    ],
  },
];

export function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            What We Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Services designed to elevate your business beyond expectations
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
                <item.icon className="w-6 h-6 text-primary" />
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
