import { supabase } from "@/lib/supabase";
import { Property } from "@/types/property";

// Convierte una fila plana de la BD al tipo anidado Property del front
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Property {
  return {
    id: row.id as string,
    title: row.title as string,
    price: Number(row.price),
    priceFormatted: row.price_formatted as string,
    rentalPeriod: (row.rental_period as "mo" | "yr") ?? undefined,
    listingType: row.listing_type as "sale" | "rent",
    category: row.category as Property["category"],
    badge: row.badge as string | undefined,
    isFeatured: row.is_featured as boolean | undefined,
    location: {
      address: row.address as string,
      neighborhood: row.neighborhood as string | undefined,
      city: row.city as string,
      stateOrCountry: row.state_or_country as string,
      fullLocation: row.full_location as string,
    },
    specs: {
      beds: Number(row.beds),
      baths: Number(row.baths),
      areaSqm: Number(row.area_sqm),
    },
    imageUrl: row.image_url as string,
    imageAlt: row.image_alt as string,
  };
}

// --- Featured properties (sin paginación) ---
export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured properties:", error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

// --- Market properties con paginación + filtro ---
export async function getMarketProperties(opts: {
  page?: number;
  pageSize?: number;
  listingType?: "all" | "sale" | "rent";
}): Promise<{ properties: Property[]; totalCount: number }> {
  const { page = 1, pageSize = 6, listingType = "all" } = opts;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("is_featured", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (listingType !== "all") {
    query = query.eq("listing_type", listingType);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching market properties:", error.message);
    return { properties: [], totalCount: 0 };
  }

  return {
    properties: (data ?? []).map(mapRow),
    totalCount: count ?? 0,
  };
}

