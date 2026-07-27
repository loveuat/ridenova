"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setLoading(false);
          }, 100);

          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />

        {/* Percentage */}
        <p className="text-2xl font-semibold tracking-wider text-white">
          {Math.round(progress)}%
        </p>

        {/* Loading Text */}
        <p className="text-sm tracking-[0.3em] text-white/70">
          LOADING
        </p>

      </div>
    </div>
  );
}