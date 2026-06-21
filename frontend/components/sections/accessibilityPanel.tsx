'use client';

import { useState } from 'react';
import { useAccessibility } from '@/components/sections/accessibilityProvider';

export default function AccessibilityPanel() {
  const { isOpen } = useAccessibility();

  const [darkMode, setDarkMode] = useState(false);

  if (!isOpen) return null;

  const toggleDarkMode = () => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }

    setDarkMode(!darkMode);
  };

return (
    <div
      className="
        fixed
        bottom-24
        right-6
        z-[9999]
        w-72
        bg-white
        text-black
        border
        p-4
      "
    >
      <h2>Accessibility Menu</h2>

      <button className="block border p-2 mt-2 w-full">
        Dark Mode
      </button>

      <button className="block border p-2 mt-2 w-full">
        Increase Font
      </button>

      <button className="block border p-2 mt-2 w-full">
        High Contrast
      </button>
    </div>
  );
}