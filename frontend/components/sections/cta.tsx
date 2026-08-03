"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ColourfulText } from "@/components/ui/colorful-text";
import { useTranslations } from "next-intl";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section
      id="contact"
      className="py-20 bg-background relative overflow-hidden"
    >

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />
      </div>


      <div className="container mx-auto px-4 relative z-10">

        <div className="max-w-3xl mx-auto text-center">

          <h2 className="
            text-3xl 
            md:text-5xl 
            font-bold 
            text-foreground 
            mb-6 
            text-balance
          ">
            {t("titleBefore")}{" "}
            
            <ColourfulText
              text={t("highlight")}
              colors={[
                "#fdb813",
                "#0066ff",
                "#00a8e8"
              ]}
            />

            {" "}{t("titleAfter")}
          </h2>


          <p className="
            text-lg 
            text-muted-foreground 
            mb-8 
            text-pretty
          ">
            {t("description")}
          </p>


          <div className="
            flex 
            flex-col 
            sm:flex-row 
            gap-4 
            justify-center
          ">

            <Button
              asChild
              size="lg"
              className="
                bg-primary 
                hover:bg-primary/90 
                text-primary-foreground 
                px-8 
                py-6 
                text-lg 
                group
              "
            >

              <Link href="/#booking-form">

                {t("bookButton")}

                <ArrowRight
                  className="
                    ml-2 
                    h-5 
                    w-5 
                    group-hover:translate-x-1 
                    transition-transform
                  "
                />

              </Link>

            </Button>



            <Button
              asChild
              size="lg"
              variant="outline"
              className="
                border-border 
                text-foreground 
                hover:bg-secondary 
                px-8 
                py-6 
                text-lg
              "
            >

              <a href="tel:+918770570764">
                {t("callButton")}
              </a>

            </Button>


          </div>

        </div>

      </div>

    </section>
  );
}