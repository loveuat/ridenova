import { Quote } from "lucide-react";

export function MissionSection() {
  return (
    <section className="py-20 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Column 1 */}
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />

            {/* Content */}
            <div className="relative z-10">

              {/* Quote Icon */}
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Our <span className="text-gradient">Mission</span>
              </h3>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
               To provide reliable, affordable, and premium car rental services that exceed customer expectations. We commit to safety, professionalism, and exceptional customer service in every journey.
              </p>
            </div>
          </div>


          {/* Column 2 */}
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />

            {/* Content */}
            <div className="relative z-10">

              {/* Quote Icon */}
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Our <span className="text-gradient">Vision</span>
              </h3>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
               To become the most trusted and preferred car rental service provider in the region, known for quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}