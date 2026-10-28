"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { PropertyCategory, PropertyFilterParams } from "@/types/property";
import { FilterModal } from "@/components/home/FilterModal";

interface HeroSearchProps {
  initialFilters?: PropertyFilterParams;
  totalMarketCount?: number;
}

export function HeroSearch({
  initialFilters = {},
  totalMarketCount = 38,
}: HeroSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") || initialFilters.query || "";
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [prevQuery, setPrevQuery] = useState(currentQuery);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Patrón estándar de React 19 para sincronizar cambios en searchParams durante renderizado
  if (prevQuery !== currentQuery) {
    setPrevQuery(currentQuery);
    setSearchQuery(currentQuery);
  }

  // Categoría activa desde searchParams o initialFilters
  const currentCategory = (
    searchParams.get("category") ||
    initialFilters.category ||
    "all"
  ).toLowerCase() as PropertyCategory;

  const categories: { label: string; value: PropertyCategory }[] = [
    { label: "All", value: "all" },
    { label: "House", value: "house" },
    { label: "Apartment", value: "apartment" },
    { label: "Villa", value: "villa" },
    { label: "Penthouse", value: "penthouse" },
  ];

  const activeFiltersCount = [
    Boolean(searchParams.get("q")),
    Boolean(searchParams.get("minPrice")),
    Boolean(searchParams.get("maxPrice")),
    Boolean(searchParams.get("beds")),
    Boolean(searchParams.get("baths")),
    Boolean(searchParams.get("amenities")),
    Boolean(searchParams.get("category") && searchParams.get("category") !== "all"),
  ].filter(Boolean).length;

  const handleCategoryClick = (category: PropertyCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    // Limpiar filter=all si existe, ya que "all" es el valor por defecto
    if (params.get("filter") === "all") {
      params.delete("filter");
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }
    // Limpiar filter=all si existe
    if (params.get("filter") === "all") {
      params.delete("filter");
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleApplyModalFilters = (appliedFilters: PropertyFilterParams) => {
    const params = new URLSearchParams(searchParams.toString());

    // Asegurar que filter=all nunca se añada a la URL
    if (appliedFilters.listingType && appliedFilters.listingType !== "all") {
      params.set("filter", appliedFilters.listingType);
    } else {
      params.delete("filter");
    }

    if (appliedFilters.query?.trim()) {
      params.set("q", appliedFilters.query.trim());
      setSearchQuery(appliedFilters.query.trim());
    } else {
      params.delete("q");
      setSearchQuery("");
    }

    if (appliedFilters.category && appliedFilters.category !== "all") {
      params.set("category", appliedFilters.category);
    } else {
      params.delete("category");
    }

    if (appliedFilters.minPrice && appliedFilters.minPrice > 0) {
      params.set("minPrice", String(appliedFilters.minPrice));
    } else {
      params.delete("minPrice");
    }

    if (appliedFilters.maxPrice && appliedFilters.maxPrice < 15000000) {
      params.set("maxPrice", String(appliedFilters.maxPrice));
    } else {
      params.delete("maxPrice");
    }

    if (appliedFilters.beds && appliedFilters.beds > 0) {
      params.set("beds", String(appliedFilters.beds));
    } else {
      params.delete("beds");
    }

    if (appliedFilters.baths && appliedFilters.baths > 0) {
      params.set("baths", String(appliedFilters.baths));
    } else {
      params.delete("baths");
    }

    if (appliedFilters.amenities && appliedFilters.amenities.length > 0) {
      params.set("amenities", appliedFilters.amenities.join(","));
    } else {
      params.delete("amenities");
    }

    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  // Construir initialFilters para el modal a partir de los searchParams actuales
  const modalInitialFilters: PropertyFilterParams = {
    query: searchParams.get("q") || undefined,
    category: searchParams.get("category") || undefined,
    listingType: (searchParams.get("filter") as "all" | "sale" | "rent") || "all",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    beds: searchParams.get("beds") ? Number(searchParams.get("beds")) : undefined,
    baths: searchParams.get("baths") ? Number(searchParams.get("baths")) : undefined,
    amenities: searchParams.get("amenities")
      ? searchParams.get("amenities")!.split(",").filter(Boolean)
      : undefined,
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
          Find your{" "}
          <span className="relative inline-block">
            <span className="relative z-10 font-medium">sanctuary</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0" />
          </span>
          .
        </h1>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon
              name="search"
              className="text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors"
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, neighborhood, or address..."
            className="block w-full pl-12 pr-28 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg outline-none"
          />
          <button
            type="submit"
            className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20 cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Category Pills & Filters */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleCategoryClick(cat.value)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 hover:-translate-y-0.5"
                    : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          <div className="w-px h-6 bg-nordic-dark/10 mx-2" />

          {/* Filters Button */}
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all cursor-pointer ${
              activeFiltersCount > 0
                ? "bg-mosque text-white shadow-md shadow-mosque/25 hover:bg-mosque/90"
                : "bg-white border border-nordic-dark/5 text-nordic-dark hover:bg-black/5"
            }`}
          >
            <Icon name="tune" className="text-base" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-mosque text-xs font-bold flex items-center justify-center ml-0.5 shadow-xs">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          initialFilters={modalInitialFilters}
          onApply={handleApplyModalFilters}
          totalMarketCount={totalMarketCount}
        />
      )}
    </section>
  );
}
