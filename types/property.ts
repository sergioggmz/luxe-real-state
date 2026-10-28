export type ListingType = "sale" | "rent";

export type PropertyCategory =
  | "all"
  | "house"
  | "apartment"
  | "villa"
  | "penthouse"
  | "condo"
  | "townhouse";

export interface PropertyFilterParams {
  page?: number;
  pageSize?: number;
  listingType?: "all" | "sale" | "rent";
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  amenities?: string[];
}

export interface PropertyLocation {
  address: string;
  neighborhood?: string;
  city: string;
  stateOrCountry: string;
  fullLocation: string;
}

export interface PropertySpecs {
  beds: number;
  baths: number;
  areaSqm: number;
}

export interface PropertyAgent {
  name: string;
  title: string;
  avatar: string;
  phone: string;
  email: string;
}

export interface PropertyImage {
  id: string;
  propertyId?: string;
  imageUrl: string;
  imageAlt?: string;
  displayOrder?: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  priceFormatted: string;
  rentalPeriod?: "mo" | "yr";
  listingType: ListingType;
  category: PropertyCategory;
  location: PropertyLocation;
  specs: PropertySpecs;
  /** Arreglo unificado de imágenes (la primera [0] es la portada y las subsiguientes las adicionales) */
  images: PropertyImage[];
  /** Helper derivado de images[0].imageUrl para mantener compatibilidad */
  imageUrl: string;
  /** Helper derivado de images[0].imageAlt para mantener compatibilidad */
  imageAlt: string;
  badge?: string; // e.g. "Exclusive", "New Arrival", "FOR SALE", "FOR RENT"
  isFeatured?: boolean;
  isFavorite?: boolean;
  description?: string;
  amenities?: string[];
  garage?: number;
  latitude?: number;
  longitude?: number;
  agent?: PropertyAgent;
}
