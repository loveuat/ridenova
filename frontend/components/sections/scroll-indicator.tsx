"use client";

import { usePathname } from "next/navigation";
import { CarFront, ArrowDown } from "lucide-react";

export function ScrollToBooking() {
  const pathname = usePathname();

  // Remove locale from pathname
  const isHomePage =
    pathname === "/" ||
    /^\/(en|hi|fr)(\/)?$/.test(pathname);

  if (!isHomePage) {
    return null;
  }

  const handleScroll = () => {
    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
      bookingForm.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      aria-label="Scroll to booking form"
      className="
        absolute
        bottom-8
        left-1/2
        z-10
        -translate-x-1/2
        cursor-pointer
        animate-bounce
        border-0
        bg-transparent
        p-2
        text-yellow-400
        drop-shadow-lg
        transition-transform
        hover:scale-110
      "
    >
      <div className="flex flex-col items-center gap-1">
        <CarFront className="h-7 w-7" />
        <ArrowDown className="h-5 w-5 animate-pulse" />
      </div>
    </button>
  );
}