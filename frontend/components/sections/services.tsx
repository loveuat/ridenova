"use client";

import Image from "next/image";
export const services = [
   {
    image: "/services/6.jpg",
    title: "WordPress Developer",
    description:
"Build custom, high-performance WordPress websites tailored to your business needs with scalable and SEO-friendly solutions.",
    features: [
    "Custom Theme Development",
  "Plugin Development & Integration",
  "WooCommerce Development"
    ],
  },

{
image: "/services/4.jpg",
title: "Shopify Developer",
description:
"Create powerful eCommerce experiences with custom Shopify development, performance optimization, and scalable store solutions.",
features: [
"Custom Shopify Development",
"Payment & Shipping Integration",
"Conversion Rate Optimization"
],
},


   {
    image: "/services/3.jpg",
    title: "WooCommerce Developer",
    description:
      "Maintain and optimize your WooCommerce store for better performance, security, and conversions.",
    features: [
      "Store Updates",
      "Payment Gateway Support",
      "Performance Optimization",
    ],
  },

{
image: "/services/seo.webp",
title: "SEO Services",
description:
"Improve search rankings, attract qualified leads, and grow your business with comprehensive SEO solutions tailored to your industry and goals.",
features: [
"Technical SEO Audits",
"Content Optimization",
"SEO Analytics & Reporting"
],
},

{
image: "/services/7.jpg",
title: "React Developer",
description:
"Create modern, dynamic, and user-friendly web applications using React, delivering exceptional performance and seamless user experiences.",
features: [
"React Application Development",
"Interactive UI/UX Implementation",
"Third-Party API Integrations"
],
},

{
image: "/services/nodejs.png",
title: "Node.js Developer",
description:
"Develop fast, secure, and scalable server-side applications using Node.js, enabling seamless performance and business growth.",
features: [
"REST API & Microservices",
"Third-Party Integrations",
"Performance Optimization"
],
},

  {
    image: "/services/1.webp",
    title: "Website Maintenance Services",
    description:
      "Keep your website secure, updated, and performing at its best with proactive maintenance.",
    features: [
      "Regular Website Updates",
      "Security Monitoring",
      "Performance Optimization",
    ],
  },
  {
    image: "/services/2.webp",
    title: "Website Management Services",
    description:
      "Complete website management solutions to ensure smooth operations and business continuity.",
    features: [
      "Content Management",
      "Website Monitoring",
      "Technical Support",
    ],
  },
  {
    image: "/services/5.jpg",
    title: "Helpdesk Services",
    description:
      "Get reliable technical support and quick issue resolution whenever you need assistance.",
    features: [
      "24/7 Support",
      "Bug Fixes",
      "Technical Assistance",
    ],
  },
];

export  function ServicesGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
             <h2 className="pb-3 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
        Our <span className="text-gradient-orange">Service</span></h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative mb-6 h-52 overflow-hidden rounded-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="mb-4 text-2xl font-bold">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-6 text-muted-foreground">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
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

