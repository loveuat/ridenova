"use client";

import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export function MissionSection() {
  const t = useTranslations("mission");

  const sections = [
    {
      title: t("missionTitle"),
      content: t("missionContent"),
    },
    {
      title: t("visionTitle"),
      content: t("visionContent"),
    },
  ];

  return (
    <section className="py-20 px-4">

      <div className="w-full max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {sections.map((item, index) => (

            <div
              key={index}
              className="
                relative 
                bg-card 
                border 
                border-border 
                rounded-2xl 
                p-8 
                md:p-12 
                overflow-hidden
              "
            >

              {/* Background Gradient */}
              <div className="
                absolute 
                inset-0 
                bg-gradient-to-br 
                from-primary/10 
                via-transparent 
                to-transparent
              " />


              {/* Decorative Elements */}
              <div className="
                absolute 
                -bottom-10 
                -right-10 
                w-40 
                h-40 
                rounded-full 
                bg-primary/5 
                blur-3xl
              " />

              <div className="
                absolute 
                -top-10 
                -left-10 
                w-32 
                h-32 
                rounded-full 
                bg-primary/5 
                blur-3xl
              " />


              {/* Content */}
              <div className="relative z-10">


                <div className="
                  w-16 
                  h-16 
                  rounded-full 
                  bg-primary/20 
                  flex 
                  items-center 
                  justify-center 
                  mb-6
                ">
                  <Quote className="w-8 h-8 text-primary" />
                </div>



                <h3 className="
                  text-2xl 
                  md:text-3xl 
                  font-bold 
                  mb-6
                ">

                  {item.title}

                </h3>



                <p className="
                  text-lg 
                  md:text-xl 
                  text-muted-foreground 
                  leading-relaxed
                ">
                  {item.content}
                </p>


              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}