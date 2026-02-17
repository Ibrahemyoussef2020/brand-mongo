import { Locale } from "@/types";

export const sTranslate = (obj: any, locale: Locale): string => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj['en'] || '';
};
