"use client";

import { useState } from "react";
import { useTranslations } from "@/i18n/I18nProvider";

interface PropertyAboutProps {
  description?: string;
}

export function PropertyAbout({ description }: PropertyAboutProps) {
  const { t } = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const fallbackText = t("property.aboutFallback");

  const text = description || fallbackText;
  const paragraphs = text.split("\n\n").filter(Boolean);

  const isLong = paragraphs.length > 2 || text.length > 400;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-4 text-nordic">{t("property.aboutTitle")}</h2>
      <div className="prose prose-slate max-w-none text-nordic/70 leading-relaxed space-y-4">
        {isExpanded || !isLong ? (
          paragraphs.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <>
            <p>{paragraphs[0]}</p>
            {paragraphs[1] && <p>{paragraphs[1]}</p>}
          </>
        )}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-mosque font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
        >
          <span>{isExpanded ? t("property.showLess") : t("property.readMore")}</span>
          <span className="material-icons text-sm">
            {isExpanded ? "arrow_upward" : "arrow_forward"}
          </span>
        </button>
      )}
    </section>
  );
}

