import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does SmartWorking provide?",
    answer:
      "We provide comprehensive digital transformation solutions including web development, mobile applications, cloud infrastructure, AI integration, and strategic consulting to help businesses thrive in the digital age.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while enterprise solutions can span 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes, we offer flexible support packages including 24/7 monitoring, regular updates, security patches, and dedicated account management to ensure your solutions run smoothly.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across diverse sectors including fintech, healthcare, e-commerce, real estate, and SaaS. Our team adapts quickly to industry-specific requirements and compliance standards.",
  },
  {
    question: "How do you ensure project quality?",
    answer:
      "We follow agile methodologies with regular sprint reviews, automated testing, code reviews, and QA processes. Clients receive progress updates and demos throughout the development cycle.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing including fixed-price projects, time & materials, and retainer arrangements. We&apos;ll recommend the best model based on your project requirements during our discovery call.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our services, process, and
            how we can help your business grow.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6 text-base md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
