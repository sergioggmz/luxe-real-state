import type { Dictionary } from "@/i18n/dictionaries";

export type TranslateVars = Record<string, string | number>;

function lookup(dict: unknown, key: string): unknown {
  return key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[part]
          : undefined,
      dict
    );
}

// Crea las funciones de traducción para un diccionario. Se usa tanto en servidor como en cliente.
export function createTranslator(dict: Dictionary) {
  const has = (key: string) => typeof lookup(dict, key) === "string";

  // Devuelve la cadena con {variables} interpoladas; si no existe devuelve la propia clave
  const t = (key: string, vars?: TranslateVars): string => {
    const value = lookup(dict, key);
    if (typeof value !== "string") return key;
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, (_, name) =>
      name in vars ? String(vars[name]) : `{${name}}`
    );
  };

  // Devuelve valores no string (por ejemplo, listas)
  const raw = <T = unknown>(key: string): T | undefined =>
    lookup(dict, key) as T | undefined;

  return { t, has, raw };
}

