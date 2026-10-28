import { cache } from "react";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/translate";

// Lee el idioma desde la cookie. Es acceso dinámico: usar siempre dentro de <Suspense>.
export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
});

// Atajo para Server Components y generateMetadata
export async function getTranslator() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return { locale, dict, ...createTranslator(dict) };
}

