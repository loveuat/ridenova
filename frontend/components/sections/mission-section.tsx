import { Quote } from "lucide-react";
export function MissionSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          
          {/* Quote Icon */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Quote className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Our <span className="text-gradient">Mission</span>
            </h3>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
  We partner with startups, businesses, and enterprises to build future-ready digital solutions. From modern websites and eCommerce platforms to AI-powered applications and automation systems, our team delivers technology that drives innovation and measurable results.
</p>

<p className="mt-6 text-primary font-semibold italic">
  Building technology that powers business success.
</p>

          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
