interface PropertyAmenitiesProps {
  amenities?: string[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const defaultAmenities = [
    "Smart Home System",
    "Swimming Pool",
    "Central Heating & Cooling",
    "Electric Vehicle Charging",
    "Private Gym",
    "Wine Cellar",
  ];

  const items = amenities && amenities.length > 0 ? amenities : defaultAmenities;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-6 text-nordic">Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {items.map((amenity) => (
          <div key={amenity} className="flex items-center gap-3 text-nordic/70">
            <span className="material-icons text-mosque/60 text-sm">
              check_circle
            </span>
            <span className="text-sm sm:text-base font-normal">{amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

