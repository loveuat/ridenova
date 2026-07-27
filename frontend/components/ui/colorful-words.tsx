"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function ColourfulWords({ text }: { text: string }) {
  const colors = [
    "rgb(131, 179, 32)",
    "rgb(47, 195, 106)",
    "rgb(42, 169, 210)",
    "rgb(4, 112, 202)",
    "rgb(107, 10, 255)",
    "rgb(183, 0, 218)",
    "rgb(218, 0, 171)",
    "rgb(230, 64, 92)",
    "rgb(232, 98, 63)",
    "rgb(249, 129, 47)",
  ];

  const words = text.split(" ");

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${count}-${index}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.03, 1],
            filter: ["blur(0px)", "blur(4px)", "blur(0px)"],
            opacity: [1, 0.85, 1],
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
          }}
          className="inline-block font-sans tracking-tight mr-2"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}