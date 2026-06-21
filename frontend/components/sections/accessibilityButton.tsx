'use client';

import { useAccessibility } from '@/components/sections/accessibilityProvider';

export default function AccessibilityButton() {
  const { isOpen, setIsOpen } = useAccessibility();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Accessibility Settings"
      className="
        fixed
        bottom-6
        right-6
        z-50
        h-14
        w-14
        rounded-full
        bg-blue-600
        text-white
        shadow-lg
      "
    >
      ♿
    </button>
  );
}