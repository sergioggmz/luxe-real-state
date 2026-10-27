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

