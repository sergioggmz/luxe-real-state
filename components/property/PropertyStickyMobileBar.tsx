"use client";

import { Property } from "@/types/property";

interface PropertyStickyMobileBarProps {
  property: Property;
  onScheduleClick?: () => void;
}

export function PropertyStickyMobileBar({
  property,
}: PropertyStickyMobileBarProps) {
  const phone = property.agent?.phone || "+1 (555) 234-5678";

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
      <div>
        <span className="text-xs text-nordic/60 block">Price</span>
        <span className="text-xl font-bold text-nordic">
          {property.priceFormatted}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={`tel:${phone}`}
          aria-label="Call Agent"
          className="p-3 rounded-lg border border-nordic/15 text-nordic hover:border-mosque hover:text-mosque transition-colors"
        >
          <span className="material-icons text-xl leading-none">call</span>
        </a>

        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 300, behavior: "smooth" });
          }}
          className="bg-mosque hover:bg-primary-hover text-white px-5 py-3 rounded-lg font-medium text-sm transition-all shadow-md shadow-mosque/20 flex items-center gap-1.5"
        >
          <span className="material-icons text-base">calendar_today</span>
          <span>Schedule Visit</span>
        </button>
      </div>
    </div>
  );
}

