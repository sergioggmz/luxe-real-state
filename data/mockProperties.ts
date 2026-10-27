import { Property } from "@/types/property";

export const FEATURED_PROPERTIES: Property[] = [
  {
    id: "feat-1",
    title: "The Glass Pavilion",
    price: 5250000,
    priceFormatted: "$5,250,000",
    listingType: "sale",
    category: "villa",
    badge: "Exclusive",
    isFeatured: true,
    location: {
      address: "Beverly Hills",
      city: "Beverly Hills",
      stateOrCountry: "California",
      fullLocation: "Beverly Hills, California",
    },
    specs: {
      beds: 5,
      baths: 4.5,
      areaSqm: 4200,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM",
    imageAlt: "Luxury modern villa exterior with pool",
  },
  {
    id: "feat-2",
    title: "Azure Heights Penthouse",
    price: 3800000,
    priceFormatted: "$3,800,000",
    listingType: "sale",
    category: "penthouse",
    badge: "New Arrival",
    isFeatured: true,
    location: {
      address: "Downtown",
      city: "Vancouver",
      stateOrCountry: "British Columbia",
      fullLocation: "Downtown, Vancouver",
    },
    specs: {
      beds: 3,
      baths: 3,
      areaSqm: 2100,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s",
    imageAlt: "Modern interior living room with view",
  },
];

export const MARKET_PROPERTIES: Property[] = [
  {
    id: "market-1",
    title: "Modern Family Home",
    price: 850000,
    priceFormatted: "$850,000",
    listingType: "sale",
    category: "house",
    badge: "FOR SALE",
    location: {
      address: "123 Pine St",
      city: "Seattle",
      stateOrCountry: "WA",
      fullLocation: "123 Pine St, Seattle",
    },
    specs: {
      beds: 3,
      baths: 2,
      areaSqm: 120,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E",
    imageAlt: "Modern white house facade",
  },
  {
    id: "market-2",
    title: "Urban Loft",
    price: 3200,
    priceFormatted: "$3,200",
    rentalPeriod: "mo",
    listingType: "rent",
    category: "apartment",
    badge: "FOR RENT",
    location: {
      address: "456 Elm Ave",
      city: "Portland",
      stateOrCountry: "OR",
      fullLocation: "456 Elm Ave, Portland",
    },
    specs: {
      beds: 1,
      baths: 1,
      areaSqm: 85,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4",
    imageAlt: "Stylish apartment living room",
  },
  {
    id: "market-3",
    title: "Highland Retreat",
    price: 620000,
    priceFormatted: "$620,000",
    listingType: "sale",
    category: "house",
    badge: "FOR SALE",
    location: {
      address: "789 Mountain Rd",
      city: "Bend",
      stateOrCountry: "OR",
      fullLocation: "789 Mountain Rd, Bend",
    },
    specs: {
      beds: 2,
      baths: 2,
      areaSqm: 98,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro",
    imageAlt: "Cabin in the woods exterior",
  },
  {
    id: "market-4",
    title: "Sea View Penthouse",
    price: 4500,
    priceFormatted: "$4,500",
    rentalPeriod: "mo",
    listingType: "rent",
    category: "penthouse",
    badge: "FOR RENT",
    location: {
      address: "321 Ocean Dr",
      city: "Miami",
      stateOrCountry: "FL",
      fullLocation: "321 Ocean Dr, Miami",
    },
    specs: {
      beds: 3,
      baths: 3,
      areaSqm: 180,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U",
    imageAlt: "Bright bedroom with large window",
  },
  {
    id: "market-5",
    title: "Central Studio",
    price: 550000,
    priceFormatted: "$550,000",
    listingType: "sale",
    category: "apartment",
    badge: "FOR SALE",
    location: {
      address: "555 Main St",
      city: "Chicago",
      stateOrCountry: "IL",
      fullLocation: "555 Main St, Chicago",
    },
    specs: {
      beds: 1,
      baths: 1,
      areaSqm: 50,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE",
    imageAlt: "Cozy apartment interior",
  },
  {
    id: "market-6",
    title: "Garden Villa",
    price: 2800,
    priceFormatted: "$2,800",
    rentalPeriod: "mo",
    listingType: "rent",
    category: "villa",
    badge: "FOR RENT",
    location: {
      address: "999 Oak Ln",
      city: "Austin",
      stateOrCountry: "TX",
      fullLocation: "999 Oak Ln, Austin",
    },
    specs: {
      beds: 2,
      baths: 2,
      areaSqm: 110,
    },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8",
    imageAlt: "Modern minimalist home exterior",
  },
  {
    id: "market-7",
    title: "The Glass Horizon",
    price: 6450000,
    priceFormatted: "$6,450,000",
    listingType: "sale",
    category: "villa",
    badge: "Exclusive",
    location: {
      address: "102 Ocean View Blvd",
      city: "Malibu",
      stateOrCountry: "CA",
      fullLocation: "102 Ocean View Blvd, Malibu",
    },
    specs: {
      beds: 5,
      baths: 5,
      areaSqm: 480,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern coastal luxury villa with infinity pool",
  },
  {
    id: "market-8",
    title: "Nordic Loft & Solarium",
    price: 3600,
    priceFormatted: "$3,600",
    rentalPeriod: "mo",
    listingType: "rent",
    category: "apartment",
    badge: "FOR RENT",
    location: {
      address: "Södermalm Waterfront",
      city: "Stockholm",
      stateOrCountry: "Sweden",
      fullLocation: "Södermalm Waterfront, Stockholm",
    },
    specs: {
      beds: 2,
      baths: 1.5,
      areaSqm: 95,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Scandinavian design apartment with natural wood and light",
  },
  {
    id: "market-9",
    title: "Alpine Sanctuary Chalet",
    price: 4900000,
    priceFormatted: "$4,900,000",
    listingType: "sale",
    category: "house",
    badge: "New Arrival",
    location: {
      address: "840 Red Mountain Rd",
      city: "Aspen",
      stateOrCountry: "CO",
      fullLocation: "840 Red Mountain Rd, Aspen",
    },
    specs: {
      beds: 4,
      baths: 4,
      areaSqm: 360,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Contemporary mountain chalet with timber accents",
  },
  {
    id: "market-10",
    title: "Skyline Grand Duplex",
    price: 7200000,
    priceFormatted: "$7,200,000",
    listingType: "sale",
    category: "penthouse",
    badge: "Exclusive",
    location: {
      address: "520 Park Ave",
      city: "New York",
      stateOrCountry: "NY",
      fullLocation: "520 Park Ave, New York",
    },
    specs: {
      beds: 4,
      baths: 4.5,
      areaSqm: 340,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Luxury penthouse with panoramic city skyline views",
  },
  {
    id: "market-11",
    title: "Casa Bellagio Residence",
    price: 8500,
    priceFormatted: "$8,500",
    rentalPeriod: "mo",
    listingType: "rent",
    category: "villa",
    badge: "FOR RENT",
    location: {
      address: "Via Regina 45",
      city: "Lake Como",
      stateOrCountry: "Italy",
      fullLocation: "Via Regina 45, Lake Como",
    },
    specs: {
      beds: 4,
      baths: 4,
      areaSqm: 320,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Historic lakeside estate with manicured gardens",
  },
  {
    id: "market-12",
    title: "Monochrome Minimalist Flat",
    price: 1450000,
    priceFormatted: "$1,450,000",
    listingType: "sale",
    category: "apartment",
    badge: "FOR SALE",
    location: {
      address: "Queen's Gate Gardens",
      city: "London",
      stateOrCountry: "UK",
      fullLocation: "Queen's Gate Gardens, London",
    },
    specs: {
      beds: 2,
      baths: 2,
      areaSqm: 115,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Minimalist London luxury apartment with tall ceilings",
  },
  {
    id: "market-13",
    title: "The Bamboo Pavilion",
    price: 4100,
    priceFormatted: "$4,100",
    rentalPeriod: "mo",
    listingType: "rent",
    category: "house",
    badge: "FOR RENT",
    location: {
      address: "Higashiyama Ward",
      city: "Kyoto",
      stateOrCountry: "Japan",
      fullLocation: "Higashiyama Ward, Kyoto",
    },
    specs: {
      beds: 3,
      baths: 2,
      areaSqm: 140,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern Japanese architectural residence with zen garden",
  },
  {
    id: "market-14",
    title: "Solstice Waterfront Villa",
    price: 3950000,
    priceFormatted: "$3,950,000",
    listingType: "sale",
    category: "villa",
    badge: "FOR SALE",
    location: {
      address: "Port d'Andratx",
      city: "Mallorca",
      stateOrCountry: "Spain",
      fullLocation: "Port d'Andratx, Mallorca",
    },
    specs: {
      beds: 4,
      baths: 4,
      areaSqm: 390,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mediterranean whitewashed villa facing the sea",
  },
  {
    id: "market-15",
    title: "The Highline Terrace Penthouse",
    price: 6800,
    priceFormatted: "$6,800",
    rentalPeriod: "mo",
    listingType: "rent",
    category: "penthouse",
    badge: "FOR RENT",
    location: {
      address: "433 Greenwich St",
      city: "New York",
      stateOrCountry: "NY",
      fullLocation: "433 Greenwich St, New York",
    },
    specs: {
      beds: 3,
      baths: 3,
      areaSqm: 230,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern loft penthouse with private rooftop terrace",
  },
  {
    id: "market-16",
    title: "Hilltop Modernist Estate",
    price: 2750000,
    priceFormatted: "$2,750,000",
    listingType: "sale",
    category: "house",
    badge: "FOR SALE",
    location: {
      address: "West Lake Hills",
      city: "Austin",
      stateOrCountry: "TX",
      fullLocation: "West Lake Hills, Austin",
    },
    specs: {
      beds: 4,
      baths: 3.5,
      areaSqm: 310,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Contemporary architectural house with outdoor terrace",
  },
];

export async function getFeaturedProperties(): Promise<Property[]> {
  return FEATURED_PROPERTIES;
}

export async function getMarketProperties(filter?: {
  listingType?: "all" | "sale" | "rent";
  category?: string;
}): Promise<Property[]> {
  if (!filter || filter.listingType === "all" || !filter.listingType) {
    return MARKET_PROPERTIES;
  }
  return MARKET_PROPERTIES.filter((p) => p.listingType === filter.listingType);
}

