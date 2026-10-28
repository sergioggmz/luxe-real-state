"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/home/PropertyCard";
import { PaginationControls } from "@/components/home/PaginationControls";
import { Property } from "@/types/property";
import { Icon } from "@/components/ui/Icon";

interface MarketSectionProps {
  properties: Property[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  activeFilter: "all" | "sale" | "rent";
}

const FILTER_TABS: { label: string; value: "all" | "sale" | "rent" }[] = [
  { label: "All", value: "all" },
  { label: "Buy", value: "sale" },
  { label: "Rent", value: "rent" },
];

export function MarketSection({
  properties,
  currentPage,
  totalPages,
  totalCount,
  activeFilter,
}: MarketSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Comprobar qué filtros están activos
  const queryParam = searchParams.get("q");
  const categoryParam = searchParams.get("category");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const bedsParam = searchParams.get("beds");
  const bathsParam = searchParams.get("baths");
  const amenitiesParam = searchParams.get("amenities");

  const isFiltering = Boolean(
    queryParam ||
      categoryParam ||
      minPriceParam ||
      maxPriceParam ||
      bedsParam ||
      bathsParam ||
      amenitiesParam
  );

  const navigate = (page: number, filter: "all" | "sale" | "rent") => {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleFilterChange = (filter: "all" | "sale" | "rent") => {
    navigate(1, filter);
  };

  const handlePageChange = (page: number) => {
    navigate(page, activeFilter);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const removeFilterParam = (key: string, specificValue?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("filter") === "all") {
      params.delete("filter");
    }

    if (key === "amenities" && specificValue && amenitiesParam) {
      const remaining = amenitiesParam
        .split(",")
        .filter((a) => a !== specificValue);
      if (remaining.length > 0) {
        params.set("amenities", remaining.join(","));
      } else {
        params.delete("amenities");
      }
    } else {
      params.delete(key);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (activeFilter !== "all") {
      params.set("filter", activeFilter);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <section id="properties-section" className="scroll-mt-10">
      {/* Header + tabs de tipo de operación */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            {isFiltering ? "Search Results" : "New in Market"}
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            {isFiltering
              ? `Found ${totalCount} ${totalCount === 1 ? "property" : "properties"} matching your criteria.`
              : "Fresh opportunities added this week."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg shadow-xs flex">
            {FILTER_TABS.map(({ label, value }) => {
              const isActive = activeFilter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleFilterChange(value)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-nordic-dark text-white shadow-xs"
                      : "text-nordic-muted hover:text-nordic-dark"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barra de Filtros Activos (Tags) */}
      {isFiltering && (
        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white/70 rounded-xl border border-nordic-dark/5 backdrop-blur-xs">
          <span className="text-xs font-semibold text-nordic-muted uppercase tracking-wider mr-1">
            Active Filters:
          </span>

          {queryParam && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-mosque/10 text-mosque rounded-full text-xs font-medium">
              Location: &ldquo;{queryParam}&rdquo;
              <button
                type="button"
                onClick={() => removeFilterParam("q")}
                className="hover:text-nordic-dark cursor-pointer ml-0.5"
                aria-label="Remove location filter"
              >
                <Icon name="close" className="text-xs" />
              </button>
            </span>
          )}

          {categoryParam && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-mosque/10 text-mosque rounded-full text-xs font-medium capitalize">
              Type: {categoryParam}
              <button
                type="button"
                onClick={() => removeFilterParam("category")}
                className="hover:text-nordic-dark cursor-pointer ml-0.5"
                aria-label="Remove category filter"
              >
                <Icon name="close" className="text-xs" />
              </button>
            </span>
          )}

          {(minPriceParam || maxPriceParam) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-mosque/10 text-mosque rounded-full text-xs font-medium">
              Price: ${Number(minPriceParam || 0).toLocaleString()} –{" "}
              {maxPriceParam ? `$${Number(maxPriceParam).toLocaleString()}` : "Any"}
              <button
                type="button"
                onClick={() => {
                  removeFilterParam("minPrice");
                  removeFilterParam("maxPrice");
                }}
                className="hover:text-nordic-dark cursor-pointer ml-0.5"
                aria-label="Remove price filter"
              >
                <Icon name="close" className="text-xs" />
              </button>
            </span>
          )}

          {bedsParam && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-mosque/10 text-mosque rounded-full text-xs font-medium">
              {bedsParam}+ Beds
              <button
                type="button"
                onClick={() => removeFilterParam("beds")}
                className="hover:text-nordic-dark cursor-pointer ml-0.5"
                aria-label="Remove beds filter"
              >
                <Icon name="close" className="text-xs" />
              </button>
            </span>
          )}

          {bathsParam && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-mosque/10 text-mosque rounded-full text-xs font-medium">
              {bathsParam}+ Baths
              <button
                type="button"
                onClick={() => removeFilterParam("baths")}
                className="hover:text-nordic-dark cursor-pointer ml-0.5"
                aria-label="Remove baths filter"
              >
                <Icon name="close" className="text-xs" />
              </button>
            </span>
          )}

          {amenitiesParam &&
            amenitiesParam.split(",").filter(Boolean).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-3 py-1 bg-mosque/10 text-mosque rounded-full text-xs font-medium"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => removeFilterParam("amenities", amenity)}
                  className="hover:text-nordic-dark cursor-pointer ml-0.5"
                  aria-label={`Remove ${amenity} amenity`}
                >
                  <Icon name="close" className="text-xs" />
                </button>
              </span>
            ))}

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-medium text-nordic-muted hover:text-nordic-dark underline underline-offset-2 ml-auto cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Grid de propiedades */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-2xl shadow-soft p-8 my-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mosque/10 text-mosque flex items-center justify-center">
            <Icon name="search_off" className="text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-nordic-dark mb-2">
            No properties found
          </h3>
          <p className="text-nordic-muted text-sm max-w-md mx-auto mb-6">
            We couldn&apos;t find any properties matching your current criteria.
            Try adjusting your location, price range, or amenities.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Icon name="refresh" className="text-base" /> Reset all filters
          </button>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
