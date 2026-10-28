import { defaultLocale, type Locale } from "@/i18n/config";
import en from "@/messages/en.json";

// Para añadir un idioma: crea messages/<code>.json y añade su loader aquí.
const loaders: Record<Locale, () => Promise<{ default: unknown }>> = {
  en: () => import("@/messages/en.json"),
  es: () => import("@/messages/es.json"),
  fr: () => import("@/messages/fr.json"),
};

// El JSON en inglés es la referencia de tipos
export type Dictionary = typeof en;

function merge(base: unknown, override: unknown): unknown {
  if (Array.isArray(override)) return override;
  if (
    base && override &&
    typeof base === "object" && typeof override === "object" &&
    !Array.isArray(base)
  ) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
      out[k] = merge(out[k], v);
    }
    return out;
  }
  return override ?? base;
}

// Carga el diccionario del idioma; las claves que falten se completan con el idioma por defecto
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === defaultLocale) return en;
  const { default: dict } = await loaders[locale]();
  return merge(en, dict) as Dictionary;
}

