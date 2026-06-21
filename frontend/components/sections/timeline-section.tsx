import { Star, Award, Lightbulb, TrendingUp, Users, Cpu } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  highlights: string[];
  icon?: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    year: "2020",
    title: "The Beginning",
    highlights: [
      "Founded Atulya IT Solutions with a vision to deliver innovative digital solutions.",
      "Started with web development and custom software services for businesses.",
      "Focused on building reliable, scalable, and user-centric technology solutions.",
    ],
    icon: <Star className="w-5 h-5" />,
  },
  {
    year: "2021",
    title: "Building Expertise",
    highlights: [
      "Expanded our team of developers, designers, and digital specialists.",
      "Successfully delivered websites and web applications across multiple industries.",
      "Strengthened expertise in WordPress, Shopify, and custom development.",
      "Established a reputation for quality, innovation, and client satisfaction.",
    ],
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    year: "2022",
    title: "Digital Growth",
    highlights: [
      "Expanded services to include mobile app development and digital marketing.",
      "Implemented modern technologies and cloud-based solutions.",
      "Helped businesses improve their online presence and digital performance.",
    ],
    icon: <Award className="w-5 h-5" />,
  },
  {
    year: "2023",
    title: "Innovation & Scale",
    highlights: [
      "Adopted advanced frameworks and modern development practices.",
      "Enhanced capabilities in React, Next.js, and enterprise web applications.",
      "Delivered scalable solutions focused on performance and security.",
      "Continued growing our portfolio of successful digital transformation projects.",
    ],
    icon: <Users className="w-5 h-5" />,
  },
  {
    year: "2024",
    title: "Driving Success",
    highlights: [
      "Expanded technology offerings with AI-powered and automation solutions.",
      "Strengthened expertise in cloud infrastructure and e-commerce development.",
      "Partnered with businesses to accelerate growth through digital innovation.",
      "Achieved significant milestones in client success and project delivery.",
    ],
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    year: "2025",
    title: "Future Ready",
    highlights: [
      "Focused on emerging technologies, AI, and intelligent business solutions.",
      "Expanded global reach and technology partnerships.",
      "Continued delivering innovative, scalable, and future-ready digital experiences.",
      "Committed to helping businesses thrive in an evolving digital landscape.",
    ],
    icon: <Lightbulb className="w-5 h-5" />,
  },
];

export function TimelineSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We discover, develop, and connect top tech talent with growing companies worldwide.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2" />

          {timelineData.map((item, index) => (
            <div
              key={item.year}
              className={`relative flex items-start gap-8 mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Year Dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center animate-pulse-glow text-primary-foreground">
                  {item.icon}
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-gradient">
                      {item.year}
                    </span>
                    <span className="text-lg font-semibold text-foreground">
                      {item.title}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-[calc(50%-3rem)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
