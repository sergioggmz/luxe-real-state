"use client";

import { useRouter, usePathname } from "next/navigation";
import { PropertyCard } from "@/components/home/PropertyCard";
import { PaginationControls } from "@/components/home/PaginationControls";
import { Property } from "@/types/property";

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

  const navigate = (page: number, filter: "all" | "sale" | "rent") => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("filter", filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (filter: "all" | "sale" | "rent") => {
    navigate(1, filter);
  };

  const handlePageChange = (page: number) => {
    navigate(page, activeFilter);
    // Scroll suave al inicio de la sección
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      {/* Header + filtros */}
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
          {FILTER_TABS.map(({ label, value }) => {
            const isActive = activeFilter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => handleFilterChange(value)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-nordic-dark text-white shadow-sm"
                    : "text-nordic-muted hover:text-nordic-dark"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de propiedades */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-nordic-muted">
          No properties found for this filter.
        </div>
      )}

      {/* Paginación */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
