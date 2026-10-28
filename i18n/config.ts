// Única fuente de verdad de idiomas. Para añadir uno:
// 1) crea messages/<code>.json  2) añade el código aquí  3) añade el loader en i18n/dictionaries.ts
export const locales = ["es", "en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const localeLabels: Record<Locale, { name: string; flag?: string }> = {
  es: { name: "Español", flag: "🇪🇸" },
  en: { name: "English", flag: "🇬🇧" },
  fr: { name: "Français", flag: "🇫🇷" },
};

// Etiqueta BCP 47 usada para formatear números y fechas con Intl
export const intlTags: Record<Locale, string> = {
  es: "es-ES",
  en: "en-US",
  fr: "fr-FR",
};

export const isLocale = (value: string | undefined | null): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

// Elige el mejor idioma soportado a partir de la cabecera Accept-Language
export function matchLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .filter((c) => c.lang && !Number.isNaN(c.q))
    .sort((a, b) => b.q - a.q);
  for (const c of candidates) {
    if (isLocale(c.lang)) return c.lang;
  }
  return defaultLocale;
}
