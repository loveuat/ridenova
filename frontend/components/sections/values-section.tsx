import { Star, Award, Lightbulb, Users } from "lucide-react";

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: <Star className="w-8 h-8" />,
    title: "Quality",
    description: "We connect businesses with top-tier technology talent, delivering skilled professionals and innovative solutions that drive growth and success.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Excellence",
    description: "We are committed to delivering outstanding results through skilled professionals, innovative thinking, and a customer-first approach.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation",
    description: "Driven by innovation, we continuously embrace emerging technologies and invest in developing skills that deliver exceptional results.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Diversity",
    description: "By bringing together talented professionals with diverse skills and experiences, we create innovative solutions that deliver exceptional results.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Values</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary">{value.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
