'use client';

import { createContext, useContext, useState } from 'react';

type AccessibilityContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccessibilityContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      'useAccessibility must be used within AccessibilityProvider'
    );
  }

  return context;
}