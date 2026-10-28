import { PropertySpecs } from "@/types/property";

interface PropertyFeaturesProps {
  specs: PropertySpecs;
  garage?: number;
}

export function PropertyFeatures({ specs, garage = 1 }: PropertyFeaturesProps) {
  const features = [
    {
      icon: "square_foot",
      value: specs.areaSqm.toLocaleString(),
      label: "Square Meters",
    },
    {
      icon: "bed",
      value: specs.beds,
      label: "Bedrooms",
    },
    {
      icon: "shower",
      value: specs.baths,
      label: "Bathrooms",
    },
    {
      icon: "directions_car",
      value: garage,
      label: "Garage",
    },
  ];

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-6 text-nordic">Property Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {features.map((feat) => (
          <div
            key={feat.label}
            className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="material-icons text-mosque text-2xl mb-2">
              {feat.icon}
            </span>
            <span className="text-xl font-bold text-nordic">{feat.value}</span>
            <span className="text-xs uppercase tracking-wider text-nordic/50 mt-1 text-center">
              {feat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

