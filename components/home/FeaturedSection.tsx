"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { FeaturedCard } from "@/components/home/FeaturedCard";
import { Property } from "@/types/property";
import { useTranslations } from "@/i18n/I18nProvider";

interface FeaturedSectionProps {
  properties: Property[];
}

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const { t } = useTranslations();
  // Asegurar un límite estricto de 2 propiedades destacadas en todo momento
  const displayedProperties = properties.slice(0, 2);

  if (displayedProperties.length === 0) return null;

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            {t("featured.title")}
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            {t("featured.subtitle")}
          </p>
        </div>
        <Link
          href="#featured-all"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
        >
          {t("featured.viewAll")} <Icon name="arrow_forward" className="text-sm" />
        </Link>
      </div>

      {/* Grid de exactamente hasta 2 Featured Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayedProperties.map((property) => (
          <FeaturedCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
