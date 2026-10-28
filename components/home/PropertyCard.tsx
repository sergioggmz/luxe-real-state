"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className = "" }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);
  const mainImage = property.images?.[0]?.imageUrl || property.imageUrl;
  const mainAlt = property.images?.[0]?.imageAlt || property.imageAlt || property.title;

  const isRent = property.listingType === "rent";
  const badgeText = property.badge || (isRent ? "FOR RENT" : "FOR SALE");
  const badgeBg = isRent ? "bg-mosque/90" : "bg-nordic-dark/90";

  return (
    <Link href={`/properties/${property.slug}`} className={`block h-full group ${className}`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Property Image & Badges */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={mainAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <button
            type="button"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${
              isFavorite
                ? "bg-mosque text-white"
                : "bg-white/90 text-nordic-dark hover:bg-mosque hover:text-white"
            }`}
          >
            <Icon name={isFavorite ? "favorite" : "favorite_border"} className="text-lg" />
          </button>

          <div
            className={`absolute bottom-3 left-3 ${badgeBg} text-white text-xs font-bold px-2 py-1 rounded shadow-xs`}
          >
            {badgeText}
          </div>
        </div>

        {/* Property Info */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-bold text-lg text-nordic-dark">
              {property.priceFormatted}
              {property.rentalPeriod && (
                <span className="text-sm font-normal text-nordic-muted">
                  /{property.rentalPeriod}
                </span>
              )}
            </h3>
          </div>

          <h4 className="text-nordic-dark font-medium truncate mb-1 group-hover:text-mosque transition-colors">
            {property.title}
          </h4>
          <p className="text-nordic-muted text-xs mb-4">
            {property.location.fullLocation}
          </p>

          {/* Specs Row */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-nordic-muted text-xs">
              <Icon name="king_bed" className="text-sm text-mosque/80" />
              <span>{property.specs.beds}</span>
            </div>
            <div className="flex items-center gap-1 text-nordic-muted text-xs">
              <Icon name="bathtub" className="text-sm text-mosque/80" />
              <span>{property.specs.baths}</span>
            </div>
            <div className="flex items-center gap-1 text-nordic-muted text-xs">
              <Icon name="square_foot" className="text-sm text-mosque/80" />
              <span>{property.specs.areaSqm}m²</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
