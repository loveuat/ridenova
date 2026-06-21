import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingComparison() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Save Up to 20% on each Package
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          Affordable, transparent pricing designed for startups, growing businesses, and enterprises. Choose the package that fits your goals and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Traditional Hiring max-w-4xl mx-auto */}
        
          
           <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
               Starter Plan
              </h3>
              <div className="text-4xl font-bold text-gradient-orange">
               ₹25k - ₹50k
              </div>
              <p className="mt-2">*Perfect for small businesses*</p>
            </div>

            <ul className="space-y-4">
              {[
                { text: "Up to 10 Pages", included: true },
                { text: "Custom Design", included: true },
                { text: "Mobile Responsive", included: true },
                { text: "Contact Forms", included: true },
                { text: "Basic SEO Setup", included: true },
                { text: "Speed Optimization", included: true },
                { text: "Analytics Integration", included: true },
                { text: "Social Media Integration", included: true },
                { text: "CMS (if required)", included: true },
                { text: "30 Days Support", included: true },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
           
<div className="space-y-3">
  <p className= "mt-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
    🚀 Technology
  </p>

  <div className="flex flex-wrap gap-2">
    <span className="rounded-full border px-3 py-1 text-sm">
      WordPress
    </span>
    <span className="rounded-full border px-3 py-1 text-sm">
      Next.js
    </span>
    <span className="rounded-full border px-3 py-1 text-sm">
      Laravel
    </span>
    <span className="rounded-full border px-3 py-1 text-sm">
      React
    </span>
    <span className="rounded-full border px-3 py-1 text-sm">
      Static Site
    </span>
  </div>
</div>
              <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
              Get Started
            </Button>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Growth Plan
              </h3>
              <div className="text-4xl font-bold text-gradient-orange">
                ₹50k - ₹1.5L
              </div>
            <p className="mt-2">*Perfect for growing businesses*</p>
            <p className="mt-0">Everything in Starter +</p>

            </div>

            <ul className="space-y-4">
              {[
                { text: "Unlimited Pages", included: true },
                { text: "Blog System", included: true },
                { text: "User Login/Registration", included: true },
                { text: "CRM Integration", included: true },
                { text: "API Integrations", included: true },
                { text: "Advanced SEO", included: true },
                { text: "Booking System", included: true },
                { text: "Dashboard/Admin Panel", included: true },
                { text: "Performance Optimization", included: true },
                { text: "Security Hardening", included: true },
                { text: "90 Days Support", included: true },
                { text: "24/7 Priority Assistance", included: true },
                { text: "Custom Feature Enhancements", included: true },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
              <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
              Get Started
            </Button>
          </div>

          {/* SmartWorking */}
        
            <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Enterprise Plan
              </h3>
              <div className="text-4xl font-bold text-gradient-orange">
                ₹1.5L+
              </div>
            <p className="mt-2">*Perfect for large organizations*</p>
            <p className="mt-0">Everything in Business Pro +</p>

            </div>

            <ul className="space-y-4">
              {[
                { text: "SaaS Platform Development", included: true },
                { text: "Multi-Tenant Architecture", included: true },
                { text: "AI Integrations", included: true },
                { text: "Custom APIs", included: true },
                { text: "Mobile App Backend", included: true },
                { text: "Enterprise Security", included: true },
                { text: "Role & Permission System", included: true },
                { text: "Reporting & Analytics", included: true },
                { text: "CI/CD Setup", included: true },
                { text: "Scalability Planning", included: true },
                { text: "Dedicated Project Manager", included: true },
                { text: "24/7 Technical Support", included: true },
                { text: "Dedicated Project Manager", included: true },


              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
              <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
              Get Started
            </Button>
          </div>
            <div className="bg-card rounded-2xl p-8 border-2 border-primary relative glow-orange">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
              Recommended
            </div>

            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI & Automation
              </h3>
              <div className="text-4xl font-bold text-gradient-orange">
                 ₹2L+
              </div>
              <p className="mt-2">*Perfect for established companies*</p>
              <p className="mt-2">Everything in Growth +</p>
            </div>

            <ul className="space-y-4">
              {[
             { text: "AI Agent Development", included: true },
{ text: "Custom GPT / AI Assistant", included: true },
{ text: "Multi-Agent AI Systems", included: true },
{ text: "RAG Knowledge Base Integration", included: true },
{ text: "AI Chatbot for Website & WhatsApp", included: true },
{ text: "Workflow Automation", included: true },
{ text: "Predictive Analytics", included: true },
{ text: "Intelligent Document Processing", included: true },
{ text: "CRM & ERP AI Integration", included: true },
{ text: "Voice AI Integration", included: true },
{ text: "Advanced Reporting Dashboard", included: true },
{ text: "Cloud Infrastructure Setup", included: true },
{ text: "Enterprise Security & Compliance", included: true },

              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
