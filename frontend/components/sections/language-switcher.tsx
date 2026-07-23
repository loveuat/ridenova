'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Icon } from "@iconify/react";
import { ChevronDown, Globe, Check } from 'lucide-react';
const languages = [
  { code: 'en', name: 'EN', icon:'icon-park-outline:english' },
  { code: 'hi', name: 'हिन्दी', icon:'hugeicons:alphabet-hindi'},
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Get locale directly from URL
  const currentLocale = pathname.split('/')[1] || 'en';

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) ||
    languages[0];

  function changeLanguage(newLocale: string) {
    const segments = pathname.split('/');

    // Replace current locale
    if (segments[1] === 'en' || segments[1] === 'hi') {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/');

    setOpen(false);

    startTransition(() => {
      router.push(newPath);
    });
  }

  return (
    <div className="relative">
      {/* Selected Language */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <Globe className="h-5 w-5" />

        <span>
          {currentLanguage.name}
        </span>

        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          {languages.map((language) => {
            const isSelected =
              currentLocale === language.code;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() =>
                  changeLanguage(language.code)
                }
                disabled={isPending}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-100"
              >
                <Globe className="h-5 w-5" />

                <span>
                  {language.name}
                </span>

                {isSelected && (
                  <Check className="ml-auto h-5 w-5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}