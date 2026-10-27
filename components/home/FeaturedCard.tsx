"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Property } from "@/types/property";

interface FeaturedCardProps {
  property: Property;
}

export function FeaturedCard({ property }: FeaturedCardProps) {
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);

  return (
    <article className="group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer">
      {/* Image with 4:3 Aspect Ratio and Badges */}
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.imageUrl}
          alt={property.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {property.badge && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic-dark">
            {property.badge}
          </div>
        )}

        <button
          type="button"
          aria-label={isFavorite ? "Remove from saved homes" : "Save property"}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
            isFavorite
              ? "bg-mosque text-white"
              : "bg-white/90 text-nordic-dark hover:bg-mosque hover:text-white"
          }`}
        >
          <Icon name={isFavorite ? "favorite" : "favorite_border"} className="text-xl" />
        </button>

        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      </div>

      {/* Details Section */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-medium text-nordic-dark group-hover:text-mosque transition-colors">
              {property.title}
            </h3>
            <p className="text-nordic-muted text-sm flex items-center gap-1 mt-1">
              <Icon name="place" className="text-sm" />
              {property.location.fullLocation}
            </p>
          </div>
          <span className="text-xl font-semibold text-mosque">
            {property.priceFormatted}
          </span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-nordic-dark/5">
          <div className="flex items-center gap-2 text-nordic-muted text-sm">
            <Icon name="king_bed" className="text-lg" />
            <span>{property.specs.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2 text-nordic-muted text-sm">
            <Icon name="bathtub" className="text-lg" />
            <span>{property.specs.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-nordic-muted text-sm">
            <Icon name="square_foot" className="text-lg" />
            <span>{property.specs.areaSqm.toLocaleString()} m²</span>
          </div>
        </div>
      </div>
    </article>
  );
}
