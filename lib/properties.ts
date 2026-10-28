import { supabase } from "@/lib/supabase";
import { Property, PropertyImage } from "@/types/property";

// Convierte una fila plana o con joins de la BD al tipo anidado Property del front
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Property {
  // Procesar imágenes unificadas: desde relación 'property_images', arreglo 'images' o fallback
  let images: PropertyImage[] = [];

  if (Array.isArray(row.property_images) && row.property_images.length > 0) {
    images = [...row.property_images]
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((img: any, idx: number) => ({
        id: (img.id as string) || `${row.id}-${idx}`,
        propertyId: (img.property_id as string) || (row.id as string),
        imageUrl: img.image_url as string,
        imageAlt: (img.image_alt as string | undefined) || (idx === 0 ? row.image_alt || row.title : `${row.title} - Photo ${idx + 1}`),
        displayOrder: Number(img.display_order ?? idx),
      }));
  } else if (Array.isArray(row.images) && row.images.length > 0) {
    images = row.images.map((url: string, idx: number) => ({
      id: `${row.id}-${idx}`,
      propertyId: row.id as string,
      imageUrl: url,
      imageAlt: idx === 0 ? row.image_alt || row.title : `${row.title} - Photo ${idx + 1}`,
      displayOrder: idx,
    }));
  } else if (row.image_url) {
    images = [
      {
        id: `${row.id}-0`,
        propertyId: row.id as string,
        imageUrl: row.image_url as string,
        imageAlt: row.image_alt as string | undefined,
        displayOrder: 0,
      },
    ];
  }

  // La imagen principal se obtiene directamente de la primera posición del arreglo de imágenes
  const primaryImageUrl =
    images[0]?.imageUrl ||
    (Array.isArray(row.images) && row.images[0]) ||
    row.image_url ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  const primaryImageAlt =
    images[0]?.imageAlt ||
    row.image_alt ||
    row.title ||
    "Luxury Property";

  return {
    id: row.id as string,
    title: row.title as string,
    slug: (row.slug as string) || (row.id as string),
    price: Number(row.price),
    priceFormatted: row.price_formatted as string,
    rentalPeriod: (row.rental_period as "mo" | "yr") ?? undefined,
    listingType: row.listing_type as "sale" | "rent",
    category: row.category as Property["category"],
    badge: row.badge as string | undefined,
    isFeatured: row.is_featured as boolean | undefined,
    description: row.description as string | undefined,
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    garage: row.garage != null ? Number(row.garage) : 1,
    latitude: row.latitude != null ? Number(row.latitude) : undefined,
    longitude: row.longitude != null ? Number(row.longitude) : undefined,
    agent: row.agent_name
      ? {
          name: row.agent_name as string,
          title: (row.agent_title as string) || "Top Rated Agent",
          avatar:
            (row.agent_avatar as string) ||
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w",
          phone: (row.agent_phone as string) || "+1 (555) 234-5678",
          email: (row.agent_email as string) || "sarah.jenkins@luxeestate.com",
        }
      : undefined,
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
    images,
    imageUrl: primaryImageUrl,
    imageAlt: primaryImageAlt,
  };
}

// --- Featured properties (sin paginación) ---
export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
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
    .select("*, property_images(*)", { count: "exact" })
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

// --- Propiedad individual por SLUG ---
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching property by slug:", error.message);
    return null;
  }

  if (!data) return null;

  return mapRow(data);
}

// --- Obtener todos los slugs para Static Generation / Sitemap ---
export async function getAllPropertySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("slug");

  if (error) {
    console.error("Error fetching all property slugs:", error.message);
    return [];
  }

  return (data ?? []).map((row) => row.slug as string).filter(Boolean);
}
