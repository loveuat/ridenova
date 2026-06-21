"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, X } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  link?: string;
  webPreviews: string[];
  mobilePreviews: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Upslopebrewing E-Commerce Platform",
    category: "Web Development",
    image: "/upslopebrewing/Home-Page-Pic-Final.jpg",
    description: "Meteorologically speaking, it’s a front range-covering, water-table-filling, snow-dumping weather pattern that anyone with bindings and a roof rack would die for. Beerologically speaking, it’s carbonated gold. In 2008, Matt Cutter, Henry Wood and Dany Page, kissed their homes in Cleveland.",
    technologies: ["PHP", "Wordpress", "HTML", "CSS", "MySql"],
    link: "https://upslopebrewing.com",
    webPreviews: [
      "/upslopebrewing/Layer-5.jpg?w=800&h=500&fit=crop",
      "/upslopebrewing/banner.png?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/upslopebrewing/tap_room_bg.jpg?w=300&h=600&fit=crop",
      "/upslopebrewing/sustainability.jpg?w=300&h=600&fit=crop",
    ],
  },
  {
    id: 2,
    title: "PlayFlix : K-Drama",
    category: "Mobile App",
    image: "/playFlix/unnamed (1).webp?w=800&h=600&fit=crop",
    description: "Playflix An app for every K-drama fan - Fall in love and binge longer - with Playflix, your ultimate destination for K-dramas that speak to your heart.",
    technologies: ["React Native", "Firebase", "Node.js"],
    link: "https://play.google.com/store/apps/details?id=com.goldflix.playfixapplication",
    webPreviews: [
      "/playFlix/unnamed (1).webp?w=800&h=500&fit=crop",
      "/playFlix/unnamed (2).webp?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/playFlix/unnamed (3).webp?w=300&h=600&fit=crop",
      "/playFlix/unnamed (4).webp?w=300&h=600&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Investaxresearch",
    category: "Web Development",
    image: "/investaxresearch/wmremove-transformed.jpeg?w=800&h=600&fit=crop",
    description: "Investa – X Research is a SEBI Registered Research Analyst Reg. No. INH000022792 providing stock market research, equity advisory, and investment strategies backed by in-depth analysis. We help investors, traders, and institutions take confident, data-driven decisions in equity markets.",
    technologies: ["PHP", "Wordpress", "Mysql", "HTML", "CSS"],
    link: "https://investaxresearch.com/",
    webPreviews: [
      "/investaxresearch/DeWatermark.ai_1755338671586.jpeg?w=800&h=500&fit=crop",
      "/investaxresearch/wmremove-transformed-1.jpeg?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/investaxresearch/greviance-e1756228974920.jpg?w=300&h=600&fit=crop",
      "/investaxresearch/business-6174790_640.jpg?w=300&h=600&fit=crop",
    ],
  },
 
  {
    id: 5,
    title: "Radio 24",
    category: "Mobile App",
    image: "/radio24/11.webp?w=800&h=600&fit=crop",
    description: "Radio24 for mobile and website is an app to play internet radio station. Radio24 allows you to listen and enjoy a variety of genres like classical, rock, pop, gospen, songs, music, talks, news, comedy, concerts.",
    technologies: ["React Native", "Firebase", "Node.js"],
    link: "https://play.google.com/store/apps/details?id=radio.music.razaweb",
    webPreviews: [
      "/radio24/16.webp?w=800&h=500&fit=crop",
      "/radio24/17.webp?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/radio24/14.webp?w=300&h=600&fit=crop",
      "/radio24/15.webp?w=300&h=600&fit=crop",
    ],
  },
  {
    id: 6,
    title: "Golf Canada",
    category: "Web Development",
    image: "/ca/Chilliwack-Golf-Club-1980x1114.jpg?w=800&h=600&fit=crop",
    description: "An interactive learning platform with video courses, live classes, quizzes, and progress tracking.",
    technologies: ["PHP", "Wordpress", "HTML", "CSS", "Mysql"],
    link: "https://www.golfcanada.ca/",
    webPreviews: [
      "/ca/Clubhouse2-Full-1734369144.png?w=800&h=500&fit=crop",
      "/ca/Lambton-Golf-Country-Club-1748829886.png?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/ca/The-Pulpit-Club-1748720045.jpg?w=300&h=600&fit=crop",
      "/ca/Sustainability-Website-Slider-1729610059-copy-1770223362.webp?w=300&h=600&fit=crop",
    ],
  },
{
    id: 7,
    title: "Dmosproshoveltools",
    category: "Web Development",
    image: "/dmosproshoveltools/Stealth-Shovel-Mount-Molle-FDE_900x.webp?w=800&h=600&fit=crop",
    description: "Instead of buying another throwaway tool, she said screw it—I’ll build a better one. That backyard frustration kicked off a mission.",
    technologies: ["Shopify", "HTML", "CSS"],
    link: "https://dmosproshoveltools.com/",
    webPreviews: [
      "/dmosproshoveltools/axpedition-235-inch-hybrid-axeaxpedition-235-inch-hybrid-axedmos-pro-shovel-tools-6219286_1800x1800.webp?w=800&h=500&fit=crop",
      "/dmosproshoveltools/axpedition-235-inch-hybrid-axeaxpedition-235-inch-hybrid-axedmos-pro-shovel-tools-6749269_1800x1800.webp?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/dmosproshoveltools/axpedition-235-inch-hybrid-axeaxpedition-235-inch-hybrid-axedmos-pro-shovel-tools-7660291_1800x1800.webp?w=300&h=600&fit=crop",
      "/dmosproshoveltools/axpedition-235-inch-hybrid-axeaxpedition-235-inch-hybrid-axedmos-pro-shovel-tools-7834509_1800x1800.jpg?w=300&h=600&fit=crop",
    ],
  },

  {
    id: 8,
    title: "Littlesaints",
    category: "Web Development",
    image: "/littlesaints/flaskduo.edited.lifestyle.arch_1100x.webp?w=800&h=600&fit=crop",
    description: "I’m Megan Klein, the founder of Little Saints. I sold the first batch of Little Saints cans out of my mint green vending trailer named “Baby Mint” in Detroit in the summer of 2021 as a solution to my own pandemic problem.",
    technologies: ["Shopify", "HTML", "CSS", "API"],
    link: "https://littlesaints.com/",
    webPreviews: [
      "/littlesaints/ls_both_spirits_1x_39d6bd23-06af-4d85-9114-12cead251558.webp?w=800&h=500&fit=crop",
      "/littlesaints/ls_stember_lifestyle_1x_3422260b-18db-47e3-b5e0-bb3cb5ca7bc1.webp?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/littlesaints/ls_stjuniper_lifestyle_1x_4f782e0b-7725-4437-87e6-2be7df39f8dc.webp?w=300&h=600&fit=crop",
      "/littlesaints/Small_Arch_St_Juniper_12_Pack_Bestsellers_d720d423-fe30-4b6d-9b4e-c22e95a584a4.webp?w=300&h=600&fit=crop",
    ],
  },

   {
    id: 9,
    title: "Luxurway",
    category: "Web Development",
    image: "/luxurway/78.webp?w=800&h=600&fit=crop",
    description: "Searching for furnished housing in Houston, TX? LUXURWAY offers an extensive selection of luxury furnished apartments and furnished homes designed for comfort, convenience, and style. Whether you need a short-term stay, corporate housing, or extended stay accommodations.",
    technologies: ["PHP", "Wordpress", "HTML", "CSS"],
    link: "https://www.luxurway.com/",
    webPreviews: [
      "/luxurway/Furnished+Housing+in+Houston+TX.webp?w=800&h=500&fit=crop",
      "/luxurway/Gemini_Generated_Image_m7tyonm7tyonm7ty+29.webp?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/luxurway/IMG_2715+fixed2.webp?w=300&h=600&fit=crop",
      "/luxurway/Untitled+design+(22).webp?w=300&h=600&fit=crop",
    ],
  },

  
   {
    id: 10,
    title: "Aicerts",
    category: "Digital Marketing",
    image: "/news/freepik__the-style-is-candid-image-photography-with-natural__86941-1.png?w=800&h=600&fit=crop",
    description: "Bond desks rarely buzz louder than they did when Oracle opened its 2026 funding window.",
    technologies: ["SEO", "Wordpress", "HTML", "CSS"],
    link: "https://www.aicerts.ai/news/",
    webPreviews: [
      "/news/A-symbolic-handshake-between-a-human-and-a-futuristic-AI-powered-robot-1024x585.jpeg?w=800&h=500&fit=crop",
      "/news/ethical-ai-in-multilingual-markets.jpg?w=800&h=500&fit=crop",
    ],
    mobilePreviews: [
      "/news/future-of-defense-ai-india.jpg?w=300&h=600&fit=crop",
      "/news/futuristic_tech_lab_with_Metas_logo_glowing_in_0-1024x573.jpg?w=300&h=600&fit=crop",
    ],
  },

];

const categories = ["All", "Web Development", "Mobile App", "Digital Marketing"];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Our Work
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Featured <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore our latest projects and see how we&apos;ve helped businesses transform their digital presence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border hover:border-primary hover:text-primary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-card border border-border cursor-pointer card-hover"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-2 bg-primary/20 text-primary border-0">
                    {item.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 group-hover:bg-secondary/50 transition-colors">
                <Badge variant="secondary" className="mb-2">
                  {item.category}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-3xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedItem?.title}
              </DialogTitle>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {/* Web Preview Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Web Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedItem.webPreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative h-40 md:h-48 rounded-lg overflow-hidden border border-border bg-secondary/30"
                      >
                        <Image
                          src={preview}
                          alt={`${selectedItem.title} web preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Preview Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Mobile Preview</h3>
                  <div className="flex gap-4 justify-start">
                    {selectedItem.mobilePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative w-32 md:w-40 h-64 md:h-80 rounded-2xl overflow-hidden border-4 border-border bg-secondary/30"
                        style={{ borderRadius: "24px" }}
                      >
                        <Image
                          src={preview}
                          alt={`${selectedItem.title} mobile preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Section */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="px-4 py-2 text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Badge className="mb-3 bg-primary/20 text-primary border-0">
                    {selectedItem.category}
                  </Badge>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>

                {/* View Project Button */}
                {selectedItem.link && selectedItem.link !== "#" && (
  <Button
    asChild
    className="bg-primary text-primary-foreground hover:bg-primary/90"
  >
    <Link
      href={selectedItem.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      View Project
    </Link>
  </Button>
)}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
