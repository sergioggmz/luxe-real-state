import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyFeatures } from "@/components/property/PropertyFeatures";
import { PropertyAbout } from "@/components/property/PropertyAbout";
import { PropertyAmenities } from "@/components/property/PropertyAmenities";
import { PropertyAgentCard } from "@/components/property/PropertyAgentCard";
import { PropertyMortgageTeaser } from "@/components/property/PropertyMortgageTeaser";
import { PropertyStickyMobileBar } from "@/components/property/PropertyStickyMobileBar";
import { PropertyMap } from "@/components/property/PropertyMap";
import { getPropertyBySlug, getAllPropertySlugs } from "@/lib/properties";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generación de metadatos dinámicos para SEO y OpenGraph
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found | LuxeEstate",
      description: "The requested luxury property could not be found.",
    };
  }

  const title = `${property.title} in ${property.location.city} | LuxeEstate`;
  const description =
    property.description?.slice(0, 160) ||
    `${property.title} - ${property.priceFormatted} in ${property.location.fullLocation}. ${property.specs.beds} Beds, ${property.specs.baths} Baths.`;
  const heroImage =
    property.images && property.images.length > 0
      ? property.images[0].imageUrl
      : property.imageUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 800,
          alt: property.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [heroImage],
    },
  };
}

// Static params para acelerar la carga de propiedades principales
export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  // Schema.org JSON-LD para RealEstateListing enriquecido
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://luxeestate.com/properties/${property.slug}`,
    image: property.images?.map((img) => img.imageUrl) || [property.imageUrl],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    about: {
      "@type": "SingleFamilyResidence",
      numberOfRooms: property.specs.beds + 1,
      numberOfBedrooms: property.specs.beds,
      numberOfBathroomsTotal: property.specs.baths,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.specs.areaSqm,
        unitCode: "MTK",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: property.location.address,
        addressLocality: property.location.city,
        addressRegion: property.location.stateOrCountry,
        addressCountry: "US",
      },
      ...(property.latitude && property.longitude
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: property.latitude,
              longitude: property.longitude,
            },
          }
        : {}),
    },
  };

  return (
    <>
      <Navbar />

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Top Left: Media Hero & Thumbnail Carousel (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <PropertyGallery
              images={property.images || []}
              title={property.title}
              badge={property.badge}
              isFeatured={property.isFeatured}
            />
          </div>

          {/* Right Sidebar: Sticky Price, Agent Profile & Leaflet Map (4 cols) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <PropertyAgentCard property={property} />

              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                title={property.title}
                address={property.location.fullLocation}
              />
            </div>
          </div>

          {/* Lower Content: Features, About, Amenities, Mortgage (8 cols) */}
          <div className="lg:col-span-8 lg:row-start-2 -mt-8 space-y-8">
            <PropertyFeatures
              specs={property.specs}
              garage={property.garage}
            />

            <PropertyAbout description={property.description} />

            <PropertyAmenities amenities={property.amenities} />

            <PropertyMortgageTeaser price={property.price} />
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar on Mobile */}
      <PropertyStickyMobileBar property={property} />

      {/* Footer matching design in code.html */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-12 pb-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-nordic/50">
            © 2026 LuxeEstate Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a
              className="text-nordic/40 hover:text-mosque transition-colors"
              href="#"
              aria-label="Facebook"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              className="text-nordic/40 hover:text-mosque transition-colors"
              href="#"
              aria-label="Twitter / X"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
