"use client";
import { useEffect, useState } from "react";
import { Star, StarHalf } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
interface Testimonial {
  id: number;
  name: string;
  designation: string;
  content: string;
  rating: number;
}

export function TestimonialEmblaSlider() {
  const locale = useLocale();
const t = useTranslations("Testimonials");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/testimonials?lang=${locale}`
        );

        if (!response.ok) {
          throw new Error(t("fetchError"));
        }

        const data = await response.json();

        setTestimonials(data);
      } catch (error) {
        console.error(
          "Failed to load testimonials:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [locale, t]);

  const row1Data = testimonials.filter(
    (_, index) => index % 2 === 0
  );

  const row2Data = testimonials.filter(
    (_, index) => index % 2 !== 0
  );

  const row1 = [...row1Data, ...row1Data];

  const row2 = [
    ...row2Data,
    ...row2Data,
  ].reverse();

  if (loading) {
    return (
      <section className="w-full bg-muted/30 py-16">
        <div className="text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            {t("badge")}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4">
           {t("heading")}
          </h2>

          <p className="mt-6 text-muted-foreground">
            {t("loading")}
          </p>
        </div>
      </section>
    );
  }

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="w-full bg-muted/30 py-16 overflow-hidden select-none">

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeLeft {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            @keyframes marqueeRight {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }

            .marquee-track-left {
              display: flex;
              width: max-content;
              gap: 16px;
              animation: marqueeLeft 90s linear infinite;
            }

            .marquee-track-right {
              display: flex;
              width: max-content;
              gap: 16px;
              animation: marqueeRight 90s linear infinite;
            }

            .marquee-track-left:hover,
            .marquee-track-right:hover {
              animation-play-state: paused;
            }
          `,
        }}
      />

      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-16">

          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            {t("badge")}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            {t("heading")}
          </h2>

        </div>
      </div>


      {/* Slider */}

      <div
        className="
          relative
          w-full
          overflow-hidden

          before:absolute
          before:left-0
          before:top-0
          before:z-10
          before:h-full
          before:w-32
          before:bg-gradient-to-r
          before:from-white
          before:to-transparent

          dark:before:from-[#0b0b0c]

          after:absolute
          after:right-0
          after:top-0
          after:z-10
          after:h-full
          after:w-32
          after:bg-gradient-to-l
          after:from-white
          after:to-transparent

          dark:after:from-[#0b0b0c]
        "
      >

        <div className="flex flex-col gap-4 w-full">

          {/* Row 1 */}

          <div className="w-full overflow-hidden">
            <div className="marquee-track-left">

              {row1.map((item, index) => (
                <TestimonialCard
                  key={`row1-${item.id}-${index}`}
                  item={item}
                />
              ))}

            </div>
          </div>


          {/* Row 2 */}

          <div className="w-full overflow-hidden">
            <div className="marquee-track-right">

              {row2.map((item, index) => (
                <TestimonialCard
                  key={`row2-${item.id}-${index}`}
                  item={item}
                />
              ))}

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}


function TestimonialCard({
  item,
}: {
  item: Testimonial;
}) {

  return (
    <div
      className="
        w-[300px]
        sm:w-[350px]
        shrink-0
        border
        hover:border-primary/50
        rounded-xl
        p-5
        flex
        flex-col
        justify-between
        transition-all
        duration-300
      "
    >

      <div className="p-[10px]">
      <div className="flex items-center gap-1 mb-4">
  {[1, 2, 3, 4, 5].map((star) => {
    if (item.rating >= star) {
      return (
        <Star
          key={star}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (item.rating >= star - 0.5) {
      return (
        <StarHalf
          key={star}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    return (
      <Star
        key={star}
        className="w-4 h-4 text-muted-foreground/30"
      />
    );
  })}

  <span className="ml-2 text-xs text-muted-foreground">
    {item.rating.toFixed(1)}
  </span>
</div>
        {/* Content */}

        <p className="text-md leading-relaxed font-normal mb-8 text-foreground">
          {item.content}
        </p>


        {/* User Info */}

        <div className="flex items-center gap-3">

          {/* Avatar */}

          <div
            className="
              w-10
              h-10
              rounded-full
              shrink-0
              bg-primary/20
              flex
              items-center
              justify-center
              text-primary
              text-sm
              font-bold
            "
          >
            {item.name
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>


          {/* Name & Designation */}

          <div className="truncate">

            <div className="text-foreground text-sm font-semibold truncate tracking-wide">
              {item.name}
            </div>

            <div className="text-muted-foreground text-xs truncate mt-0.5">
              {item.designation}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}