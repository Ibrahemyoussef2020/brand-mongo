'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '@/types';
import { sTranslate } from '@/utilities/translate';
import { usePathname } from 'next/navigation';

interface LangContextType {
  lang: Locale;
  setLang: (lang: Locale) => void;
  translate: (obj: any) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [lang, setLang] = useState<Locale>(initialLocale);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/');
      const detectedLocale = segments[1];
      if (detectedLocale === 'ar' || detectedLocale === 'en') {
        setLang(detectedLocale as Locale);
      } else if (initialLocale) {
        setLang(initialLocale);
      }
    } else if (initialLocale) {
      setLang(initialLocale);
    }
  }, [pathname, initialLocale]);

  const translate = (obj: any): string => {
    return sTranslate(obj, lang);
  };


  const value: LangContextType = {
    lang,
    setLang,
    translate
  };

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}



