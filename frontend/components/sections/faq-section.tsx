"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("faq");

  const faqs = t.raw("items") as {
    question: string;
    answer: string;
  }[];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-16">

          <span className="text-primary font-semibold text-sm uppercase tracking-wider hidden">
            FAQ
          </span>

          <h2 className="
            text-3xl 
            md:text-4xl 
            lg:text-5xl 
            font-bold 
            text-foreground 
            mt-4
          ">
            {t("title")}
          </h2>

          <p className="
            text-muted-foreground 
            mt-4 
            max-w-2xl 
            mx-auto 
            text-lg
          ">
            {t("description")}
          </p>

        </div>


        <div className="max-w-3xl mx-auto">

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
          >

            {faqs.map((faq, index) => (

              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="
                  border 
                  border-border/50 
                  rounded-lg 
                  px-6 
                  bg-card/50 
                  backdrop-blur-sm 
                  data-[state=open]:border-primary/50 
                  transition-colors
                "
              >

                <AccordionTrigger
                  className="
                    text-left 
                    text-foreground 
                    hover:text-primary 
                    hover:no-underline 
                    py-6 
                    text-base 
                    md:text-lg 
                    font-medium
                  "
                >
                  {faq.question}
                </AccordionTrigger>


                <AccordionContent
                  className="
                    text-muted-foreground 
                    pb-6 
                    text-base 
                    leading-relaxed
                  "
                >
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