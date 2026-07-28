import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Trip Mitra Go?",
    answer:
      "Trip Mitra Go is a trusted car rental and taxi booking platform offering local, outstation, airport transfer, one-way, and round-trip cab services with professional drivers and transparent pricing.",
  },
  {
    question: "Which cities does Trip Mitra Go serve?",
    answer:
      "Trip Mitra Go primarily serves Central India, including Raipur, Bilaspur, Durg, Bhilai, Jagdalpur, Jabalpur, Balaghat, Gondia, Nagpur, and nearby cities. We are continuously expanding our service network.",
  },
  {
    question: "What types of trips can I book?",
    answer:
      "You can book:Local city rides, Outstation trips, One-way cabs, Round-trip bookings, Airport transfers, Railway station pickups, Wedding car rentals,Corporate travel",
  },
  {
    question: "How can I book a car?",
    answer:
      "Yes. We believe in transparent pricing with no hidden charges. Any tolls, parking fees, or state taxes (if applicable) are communicated clearly before your trip.",
  },
  {
    question: "Are your prices transparent?",
    answer:
      "We follow agile methodologies with regular sprint reviews, automated testing, code reviews, and QA processes. Clients receive progress updates and demos throughout the development cycle.",
  },
  {
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes. Booking modifications and cancellations are available according to our cancellation policy. Please contact our support team as early as possible.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider hidden">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Find answers to frequently asked questions about booking a cab, our services, fares, cancellations, and everything you need to know before your journey with Trip Mitra Go.
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
