"use client";

import { useState } from "react";

interface PropertyAboutProps {
  description?: string;
}

export function PropertyAbout({ description }: PropertyAboutProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fallbackText =
    "Experience modern architectural luxury in this stunning residence. Designed with an emphasis on indoor-outdoor living, the residence features expansive glass walls that flood the interiors with natural light.\n\nThe open-concept kitchen is equipped with top-of-the-line appliances and custom cabinetry, perfect for culinary enthusiasts. Retreat to the primary suite, a sanctuary of relaxation with a spa-inspired bath and private balcony.";

  const text = description || fallbackText;
  const paragraphs = text.split("\n\n").filter(Boolean);

  const isLong = paragraphs.length > 2 || text.length > 400;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-4 text-nordic">About this home</h2>
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
          <span>{isExpanded ? "Show less" : "Read more"}</span>
          <span className="material-icons text-sm">
            {isExpanded ? "arrow_upward" : "arrow_forward"}
          </span>
        </button>
      )}
    </section>
  );
}

