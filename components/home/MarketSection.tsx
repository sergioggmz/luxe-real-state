"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Property } from "@/types/property";

interface MarketSectionProps {
  properties: Property[];
}

export function MarketSection({ properties }: MarketSectionProps) {
  const INITIAL_COUNT = 8;
  const [activeFilter, setActiveFilter] = useState<"All" | "Buy" | "Rent">("All");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);

  const filterTabs: ("All" | "Buy" | "Rent")[] = ["All", "Buy", "Rent"];

  const handleFilterChange = (tab: "All" | "Buy" | "Rent") => {
    setActiveFilter(tab);
    setVisibleCount(INITIAL_COUNT);
  };

  const filteredProperties = properties.filter((property) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Buy") return property.listingType === "sale";
    if (activeFilter === "Rent") return property.listingType === "rent";
    return true;
  });

  const displayedProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

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
                onClick={() => handleFilterChange(tab)}
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
        {displayedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore ? (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-8 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md cursor-pointer"
          >
            Load more properties
          </button>
        </div>
      ) : (
        <div className="mt-12 text-center text-sm text-nordic-muted font-light">
          Showing all {filteredProperties.length} properties
        </div>
      )}
    </section>
  );
}
