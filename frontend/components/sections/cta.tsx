import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Ready to Build Your{" "}
            <span className="text-gradient-orange">Dream App?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Whether you need a dedicated WordPress developer, a full-stack development, or ongoing website maintenance, we help you find the right talent to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
    asChild
    size="lg"
    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group"
  >
    <Link href="/contact">
      Contact Us
      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </Button>
            
  <Button
    asChild
    size="lg"
    variant="outline"
    className="border-border text-foreground hover:bg-secondary px-8 py-6 text-lg"
  >
 <a href="tel:+918770570764">
  Schedule a Call
</a>
  </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
