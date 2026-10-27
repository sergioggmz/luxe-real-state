"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Property } from "@/types/property";

interface MarketSectionProps {
  properties: Property[];
}

export function MarketSection({ properties }: MarketSectionProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Buy" | "Rent">("All");

  const filterTabs: ("All" | "Buy" | "Rent")[] = ["All", "Buy", "Rent"];

  const filteredProperties = properties.filter((property) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Buy") return property.listingType === "sale";
    if (activeFilter === "Rent") return property.listingType === "rent";
    return true;
  });

  return (
    <section>
      {/* Section Header with Tabs */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            New in Market
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Fresh opportunities added this week.
          </p>
        </div>

        <div className="hidden md:flex bg-white p-1 rounded-lg shadow-xs">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-nordic-dark text-white shadow-sm"
                    : "text-nordic-muted hover:text-nordic-dark"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property, index) => {
          let responsiveClasses = "";
          if (activeFilter === "All") {
            if (index === 4) responsiveClasses = "hidden xl:flex";
            if (index === 5) responsiveClasses = "hidden lg:flex";
          }
          return (
            <PropertyCard
              key={property.id}
              property={property}
              className={responsiveClasses}
            />
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button
          type="button"
          className="px-8 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md cursor-pointer"
        >
          Load more properties
        </button>
      </div>
    </section>
  );
}
