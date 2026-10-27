import { Navbar } from "@/components/layout/Navbar";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { MarketSection } from "@/components/home/MarketSection";
import { FEATURED_PROPERTIES, MARKET_PROPERTIES } from "@/data/mockProperties";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSearch />
        <FeaturedSection properties={FEATURED_PROPERTIES} />
        <MarketSection properties={MARKET_PROPERTIES} />
      </main>
    </>
  );
}
