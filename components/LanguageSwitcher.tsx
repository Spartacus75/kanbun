'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/i18n/config';

const languages = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  zh: { name: '中文', flag: '🇨🇳' },
  ko: { name: '한국어', flag: '🇰🇷' },
};

export default function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const switchLanguage = (newLang: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`;
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all shadow-sm"
      >
        <span className="text-2xl">{languages[currentLang].flag}</span>
        <span className="hidden sm:inline font-medium text-gray-700 dark:text-gray-300">
          {languages[currentLang].name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20">
            {i18n.locales.map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  lang === currentLang ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              >
                <span className="text-2xl">{languages[lang].flag}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {languages[lang].name}
                </span>
                {lang === currentLang && (
                  <svg className="w-4 h-4 ml-auto text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
