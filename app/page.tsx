export const instant = false;

import { Navbar } from "@/components/layout/Navbar";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { MarketSection } from "@/components/home/MarketSection";
import { getFeaturedProperties, getMarketProperties } from "@/lib/properties";
import { PropertyFilterParams } from "@/types/property";

const PAGE_SIZE = 6;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const {
    page = "1",
    filter = "all",
    q,
    category,
    minPrice,
    maxPrice,
    beds,
    baths,
    amenities,
  } = resolvedParams;

  const currentPage = Math.max(1, parseInt(page as string, 10) || 1);
  const listingType = (
    ["all", "sale", "rent"].includes(filter as string) ? filter : "all"
  ) as "all" | "sale" | "rent";

  const queryStr = typeof q === "string" && q.trim() ? q.trim() : undefined;
  const categoryStr =
    typeof category === "string" && category !== "all" ? category : undefined;
  const minPriceNum =
    typeof minPrice === "string" && !isNaN(Number(minPrice))
      ? Number(minPrice)
      : undefined;
  const maxPriceNum =
    typeof maxPrice === "string" && !isNaN(Number(maxPrice))
      ? Number(maxPrice)
      : undefined;
  const bedsNum =
    typeof beds === "string" && !isNaN(Number(beds))
      ? Number(beds)
      : undefined;
  const bathsNum =
    typeof baths === "string" && !isNaN(Number(baths))
      ? Number(baths)
      : undefined;
  const amenitiesArr =
    typeof amenities === "string"
      ? amenities.split(",").filter(Boolean)
      : undefined;

  const filterParams: PropertyFilterParams = {
    page: currentPage,
    pageSize: PAGE_SIZE,
    listingType,
    query: queryStr,
    category: categoryStr,
    minPrice: minPriceNum,
    maxPrice: maxPriceNum,
    beds: bedsNum,
    baths: bathsNum,
    amenities: amenitiesArr,
  };

  const isFiltering = Boolean(
    queryStr ||
      categoryStr ||
      minPriceNum ||
      maxPriceNum ||
      bedsNum ||
      bathsNum ||
      (amenitiesArr && amenitiesArr.length > 0) ||
      listingType !== "all"
  );

  const [featured, { properties: marketProps, totalCount }] = await Promise.all([
    // Solo cargamos featured si no hay filtros activos
    !isFiltering ? getFeaturedProperties() : Promise.resolve([]),
    getMarketProperties(filterParams),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSearch
          initialFilters={filterParams}
          totalMarketCount={totalCount}
        />

        {/* Solo mostramos la sección destacada cuando no hay filtros aplicados */}
        {!isFiltering && featured.length > 0 && (
          <FeaturedSection properties={featured} />
        )}

        <MarketSection
          properties={marketProps}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          activeFilter={listingType}
        />
      </main>
    </>
  );
}
