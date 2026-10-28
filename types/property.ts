export type ListingType = "sale" | "rent";

export type PropertyCategory = "all" | "house" | "apartment" | "villa" | "penthouse";

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
  propertyId: string;
  imageUrl: string;
  imageAlt?: string;
  displayOrder: number;
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
  imageUrl: string;
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
  images?: PropertyImage[];
}
