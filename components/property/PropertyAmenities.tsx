"use client";

import { useTranslations } from "@/i18n/I18nProvider";

interface PropertyAmenitiesProps {
  amenities?: string[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const { t, has, raw } = useTranslations();
  const defaultAmenities = raw<string[]>("property.defaultAmenities") ?? [];

  const items = amenities && amenities.length > 0 ? amenities : defaultAmenities;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-6 text-nordic">{t("property.amenitiesTitle")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {items.map((amenity) => (
          <div key={amenity} className="flex items-center gap-3 text-nordic/70">
            <span className="material-icons text-mosque/60 text-sm">
              check_circle
            </span>
            <span className="text-sm sm:text-base font-normal">{has(`amenities.${amenity}`) ? t(`amenities.${amenity}`) : amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

