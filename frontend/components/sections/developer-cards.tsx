import { MapPin, Star, Code } from "lucide-react";
import Image from "next/image";

const developers = [
  {
    name: "Ramgopal Singh Lodhi",
    role: "Full Stack Developer",
    experience: "11+ years",
    location: "Indore, India",
    skills: ["Shopify", "PHP", "React","Node.js","SharePoint"],
    image: "https://media.licdn.com/dms/image/v2/D4E03AQFbjjsaoLEQuw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1641194952796?e=1782345600&v=beta&t=fmWKYewLtu2q8alV0qCflWbT0ApWRAf7hBB5r5fL-Ac",
  },
  {
    name: "Sunil Yadav",
    role: "Senior WordPress Developer",
    experience: "12+ years",
    location: "Indore, India",
    skills: ["PHP", "Wordpress", "Webflow","HTML","CSS"],
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHOzHQQtdr4mA/profile-displayphoto-scale_100_100/B4DZp20FXiGQAc-/0/1762929958125?e=1782345600&v=beta&t=EXFGxy9TCmOBFbHRCPbNyFy5AGrOqMLF4k5MfnRIYLg",
  },
  {
    name: "Atul Bramhe",
    role: "Senior Business Development",
    experience: "10+ years",
    location: "Hyderabad, India",
    skills: ["Client acquisitio", "Lead generation", "Market research","Develop growth strategies"],
    image: "/team/Atul.jpeg",
  },
  {
    name: "Alisa Gupta",
    role: "UI/UX Designer",
    experience: "8+ years",
    location: "Pune, India",
    skills: ["UI/UX design", "Wireframing", "User flow creation","Logo design","Brochure & flyer design"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
  },
  /*{
    name: "Wei Zhang",
    role: "Fullstack Developer",
    experience: "7+ years",
    location: "Shanghai, China",
    skills: ["Node", "React", "Java"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },*/
];

export function DeveloperCards() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our Top Developers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pre-vetted, experienced professionals ready to join your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 card-hover"
            >
              {/* Profile Image */}
              <div className="relative mb-4">
                <Image
                  src={dev.image}
                  alt={dev.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto object-cover ring-2 ring-border group-hover:ring-primary/50 transition-all"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-2 border-card" />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-foreground text-center mb-2">
                {dev.name}
              </h3>

              {/* Role */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                <Code className="w-4 h-4 text-primary" />
                <span>{dev.role}</span>
              </div>

              {/* Experience */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                <Star className="w-4 h-4 text-primary" />
                <span>{dev.experience}</span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{dev.location}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {dev.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Book a Call Button (visible on hover) */}
             {/*<button className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Book a Call
              </button>*/ }
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
