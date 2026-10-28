"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { intlTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/translate";

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);

  // <html lang> es estático por cacheComponents; lo sincronizamos en el cliente
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslations debe usarse dentro de <I18nProvider>");
  const translator = useMemo(() => createTranslator(ctx.dict), [ctx.dict]);
  const intlTag = intlTags[ctx.locale];
  return {
    ...translator,
    locale: ctx.locale,
    formatNumber: (n: number) => new Intl.NumberFormat(intlTag).format(n),
  };
}

