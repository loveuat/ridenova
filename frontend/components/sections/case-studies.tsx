"use client";

import { useState } from "react";
import { Quote, Users, Clock, DollarSign, Shield, CheckCircle, TrendingUp } from "lucide-react";

interface CaseStudy {
  id: string;
  company: string;
  logo: string;
  metrics: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];
  testimonial: {
    quote: string;
    title: string;
    author: string;
    role: string;
    avatar: string;
  };
  additionalMetrics: {
    value: string;
    label: string;
  }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "keyloop",
    company: "Keyloop",
    logo: "K",
    metrics: [
      { value: "96%", label: "Retention rate during the first 25 months", icon: <Users className="w-5 h-5" /> },
      { value: "12 months", label: "Scaled the team to 10 developers", icon: <TrendingUp className="w-5 h-5" /> },
      { value: "£600,000", label: "Annual savings vs. UK hires & contractors", icon: <DollarSign className="w-5 h-5" /> },
    ],
    testimonial: {
      title: "Secure, quick, reliable",
      quote: "Smart Working have always delivered strong shortlists of vetted candidates in very tight timescales. We have now built a team of 10 with them and the turnover of our developers has been extremely low. We&apos;d strongly recommend using them.",
      author: "Cameron Wade",
      role: "Managing Director",
      avatar: "CW",
    },
    additionalMetrics: [
      { value: "18 months", label: "Partnership duration" },
      { value: "100%", label: "Pre-employment screening" },
      { value: "10 days", label: "To submit vetted candidates" },
    ],
  },
  {
    id: "tiller",
    company: "Tiller",
    logo: "T",
    metrics: [
      { value: "18 months", label: "Scaled the team to 6 developers", icon: <Clock className="w-5 h-5" /> },
      { value: "100%", label: "Pre-employment screening & verification", icon: <Shield className="w-5 h-5" /> },
      { value: "10 days", label: "Submitted fully-vetted candidates", icon: <CheckCircle className="w-5 h-5" /> },
    ],
    testimonial: {
      title: "Long-term, sustained partnership",
      quote: "We have worked with Smart Working for 2 years and have been very pleased with the quality and skills of their developers. Their UK team has continued to deliver excellent ongoing support to us. We now have 6 people working for us on a long-term basis.",
      author: "Mark Cadby",
      role: "Chief Technical Officer",
      avatar: "MC",
    },
    additionalMetrics: [
      { value: "6+", label: "Current team size" },
      { value: "3 rounds", label: "Tech assessments" },
      { value: "60 days", label: "Project to onboarding" },
    ],
  },
  {
    id: "i6",
    company: "i6",
    logo: "i6",
    metrics: [
      { value: "6+", label: "Current team of 6 and growing", icon: <Users className="w-5 h-5" /> },
      { value: "3 rounds", label: "Tech assessments prior to interview", icon: <CheckCircle className="w-5 h-5" /> },
      { value: "60 days", label: "From project scoping to onboarding", icon: <Clock className="w-5 h-5" /> },
    ],
    testimonial: {
      title: "Rapid scaling, quick value generation",
      quote: "Smart Working enabled us to rapidly scale our development team in response to a new significant contract win. Their service has been invaluable to our scaling, the resources secured have been of a great standard and integrated with our existing teams very well.",
      author: "Alex Mattos",
      role: "Chief Operating Officer",
      avatar: "AM",
    },
    additionalMetrics: [
      { value: "Fast", label: "Integration speed" },
      { value: "High", label: "Resource quality" },
      { value: "Growing", label: "Partnership status" },
    ],
  },
];

export function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState(caseStudies[0]);

  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Case studies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results from real partnerships. See how we&apos;ve helped companies scale their teams effectively.
          </p>
        </div>

        {/* Client Selector Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveStudy(study)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeStudy.id === study.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }`}
            >
              <span className="text-lg">{study.company}</span>
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {activeStudy.metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 text-center transition-all duration-300 hover:border-primary/50"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                {metric.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <p className="text-muted-foreground text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Block */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quote Section */}
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                {activeStudy.testimonial.title}
              </h3>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/30" />
                <p className="text-muted-foreground text-lg leading-relaxed pl-6">
                  {activeStudy.testimonial.quote}
                </p>
              </div>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {activeStudy.testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {activeStudy.testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {activeStudy.testimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="space-y-4">
              {activeStudy.additionalMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-muted/50 rounded-lg p-4 text-center"
                >
                  <div className="text-xl font-bold text-primary">
                    {metric.value}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
