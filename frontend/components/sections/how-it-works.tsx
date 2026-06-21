import { Users, Video, Rocket, HeadphonesIcon, Cake, FolderCode, Award, InfoIcon } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Users,
    title: "Requirement Gathering",
    description:
      "Requirement Gathering involves discussing and analyzing project requirements to define functionality, design preferences, business objectives.",
    highlights: ["Understand client objectives", "Define project scope and features", "Identify timelines and deliverables"],
  },
  {
    step: 2,
    icon: Video,
    title: "Prototype",
    description:
     "A prototype is a visual representation of the website or application that helps stakeholders review the layout, user flow, and functionality before development begins.",
    highlights: ["Create wireframes and page layouts", "Define user journeys and navigation structure","Design interactive mockups for review."],
  },
  {
    step: 3,
    icon: Cake,
    title: "UI/UX Design",
    description:
      "UI/UX Design focuses on creating an attractive, user-friendly, and engaging interface that provides a seamless experience across all devices.",
    highlights: ["Responsive layouts", "Modern visual styling", "Easy navigation structure"],
  },
  {
    step: 4,
    icon: FolderCode,
    title: "Development",
    description:
      "The development phase involves converting approved designs into a fully functional, responsive, and secure website or application with all required features and integrations.",
    highlights: ["Frontend development", "Backend development", "API integration"],
  },

   {
    step: 5,
    icon: Award,
    title: "Quality Assurance",
    description:
      "Quality Assurance ensures that the website or application functions correctly, performs efficiently, and delivers a smooth user experience before launch.",
    highlights: ["Functionality testing", "Bug identification", "Performance testing"],
  },

   {
    step: 6,
    icon: InfoIcon,
    title: "Support & Maintenance",
    description:
      "Support & Maintenance ensures the website or application remains secure, updated, and performs optimally after deployment.",
    highlights: ["Regular updates", "Bug fixes", "Security monitoring"],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Simple 6-Step Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
Our streamlined process takes you from idea to launch with expert guidance, transparent communication, and continuous support at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {item.step}
              </div>

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
