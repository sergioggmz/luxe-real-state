"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { locales, localeLabels } from "@/i18n/config";
import { setLocale } from "@/i18n/actions";
import { useTranslations } from "@/i18n/I18nProvider";
import { Flag } from "@/components/ui/Flag";

// Selector de idioma con banderas SVG e indicador activo
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, t } = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: string) => {
    setOpen(false);
    if (code === locale) return;
    startTransition(() => {
      void setLocale(code);
    });
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={t("common.language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 text-sm font-medium text-nordic-dark hover:text-mosque transition-colors cursor-pointer p-1 rounded-md hover:bg-black/5 ${
          isPending ? "opacity-60" : ""
        }`}
      >
        <Flag locale={locale} className="w-5 h-3.5" />
        <span className="uppercase tracking-wider font-semibold text-xs">
          {locale}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-nordic-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("common.language")}
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-nordic-dark/10 py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100"
        >
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                onClick={() => choose(code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left cursor-pointer transition-colors ${
                  code === locale
                    ? "text-mosque bg-mosque/10 font-semibold"
                    : "text-nordic-dark hover:bg-black/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Flag locale={code} className="w-5 h-3.5" />
                  <span>{localeLabels[code].name}</span>
                </div>
                {code === locale && (
                  <span className="text-mosque text-xs font-bold">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
