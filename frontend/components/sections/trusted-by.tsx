const companiesRow1 = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Vue.js",
  "Angular",
  "Nuxt.js",
  "jQuery",
  "Tailwind CSS"
];

const companiesRow2 = [
  "PHP",
  "Node.js",
  "REST API",
  "GraphQL",
  "Laravel",
  "WordPress",
  "Shopify",
  "Python",
  "C# (.NET)",
   "Java",
];

export function TrustedBy() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center mb-16">
         <span className="text-primary text-sm uppercase tracking-widest font-medium">
            TECHNOLOGY EXPERTISE
          </span>
             <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
          Our Technology Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scalable Solutions, Smart Technology
          </p>
         </div>
      </div>

      <div className="space-y-6">
        {/* Row 1 - Left to Right */}
        <div className="relative overflow-hidden group">
          <div 
            className="flex animate-marquee hover:[animation-play-state:paused]"
            style={{ width: "max-content", animationDuration: "60s" }}
          >
            {[...companiesRow1, ...companiesRow1, ...companiesRow1, ...companiesRow1].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-8 py-4 bg-card rounded-lg border border-border
                           text-xl font-semibold text-muted-foreground/70
                           hover:text-primary hover:border-primary/50 transition-all duration-300 whitespace-nowrap"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative overflow-hidden group">
          <div 
            className="flex animate-marquee-reverse hover:[animation-play-state:paused]"
            style={{ width: "max-content", animationDuration: "70s" }}
          >
            {[...companiesRow2, ...companiesRow2, ...companiesRow2, ...companiesRow2].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-8 py-4 bg-card rounded-lg border border-border
                           text-xl font-semibold text-muted-foreground/70
                           hover:text-primary hover:border-primary/50 transition-all duration-300 whitespace-nowrap"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
