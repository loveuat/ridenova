import Link from "next/link";
import { ArrowRight, ShieldCheck, Palette } from "lucide-react";

const products = [
  {
    title: "WordPress Maintenance Services",
    slug: "wordpress-maintenance-services",
    description:
      "Keep your website secure, updated and running smoothly with professional maintenance.",
    price: "₹4,999/mo",
    icon: <ShieldCheck className="w-10 h-10 text-orange-500" />,
    features: ["Daily Backups", "Security Monitoring", "Priority Support"],
  },
  {
    title: "Next Generation WordPress Theme",
    slug: "next-generation-wordpress-theme",
    description:
      "Modern, fast and SEO-friendly WordPress theme built for agencies and startups.",
    price: "₹14,999",
    icon: <Palette className="w-10 h-10 text-orange-500" />,
    features: ["Elementor Ready", "WooCommerce", "Lifetime Updates"],
  },
];

export  function OurProducts() {
  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold uppercase tracking-widest">
            Premium Solutions
          </span>

          <h2 className="mt-4 text-5xl md:text-6xl font-black text-foregroun">
            Our <span className="text-orange-500">Products</span>
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Powerful WordPress solutions designed to help businesses grow,
            scale and perform better online.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {products.map((product) => (
            <div
              key={product.slug}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:border-orange-500 hover:-translate-y-2"
            >
              {/* Glow */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

              {/* Price Badge */}
              <div className="absolute top-6 right-6 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                {product.price}
              </div>

              {/* Icon */}
              <div className="mb-6">
                {product.icon}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-card-foreground mb-4">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/ourproduct/${product.slug}`}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                View Details
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
