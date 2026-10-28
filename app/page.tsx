export const instant = false;

import { Navbar } from "@/components/layout/Navbar";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { MarketSection } from "@/components/home/MarketSection";
import { getFeaturedProperties, getMarketProperties } from "@/lib/properties";

const PAGE_SIZE = 6;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", filter = "all" } = await searchParams;

  const currentPage = Math.max(1, parseInt(page as string, 10) || 1);
  const listingType = (
    ["all", "sale", "rent"].includes(filter as string) ? filter : "all"
  ) as "all" | "sale" | "rent";

  const [featured, { properties: marketProps, totalCount }] = await Promise.all(
    [
      getFeaturedProperties(),
      getMarketProperties({
        page: currentPage,
        pageSize: PAGE_SIZE,
        listingType,
      }),
    ]
  );

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSearch />
        <FeaturedSection properties={featured} />
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
