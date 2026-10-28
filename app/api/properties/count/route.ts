import { NextRequest, NextResponse, connection } from "next/server";
import { getFilteredPropertiesCount } from "@/lib/properties";

export async function GET(request: NextRequest) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    const listingType = (searchParams.get("listingType") as "all" | "sale" | "rent") || undefined;
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const beds = searchParams.get("beds") ? Number(searchParams.get("beds")) : undefined;
    const baths = searchParams.get("baths") ? Number(searchParams.get("baths")) : undefined;
    const amenitiesParam = searchParams.get("amenities");
    const amenities = amenitiesParam ? amenitiesParam.split(",").filter(Boolean) : undefined;

    const count = await getFilteredPropertiesCount({
      query,
      category,
      listingType,
      minPrice,
      maxPrice,
      beds,
      baths,
      amenities,
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error calculating property count:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
