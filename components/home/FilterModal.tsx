"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { Icon } from "@/components/ui/Icon";
import { PropertyFilterParams } from "@/types/property";
import { useTranslations } from "@/i18n/I18nProvider";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: PropertyFilterParams;
  onApply: (filters: PropertyFilterParams) => void;
  totalMarketCount?: number;
}

const AMENITIES_LIST = [
  { id: "Swimming Pool", icon: "pool" },
  { id: "Gym", icon: "fitness_center" },
  { id: "Parking", icon: "local_parking" },
  { id: "Air Conditioning", icon: "ac_unit" },
  { id: "High-speed Wifi", icon: "wifi" },
  { id: "Patio / Terrace", icon: "deck" },
];

const MIN_PRICE_LIMIT = 0;
const MAX_PRICE_LIMIT = 15000000;
const PRICE_STEP = 50000;

function formatPriceRangeLabel(min: number, max: number, allPrices: string): string {
  const formatShort = (val: number) => {
    if (val >= 1000000) {
      const millions = val / 1000000;
      return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `$${Math.round(val / 1000)}K`;
    }
    return `$${val}`;
  };

  if (min === MIN_PRICE_LIMIT && max >= MAX_PRICE_LIMIT) {
    return allPrices;
  }
  return `${formatShort(min)} – ${formatShort(max)}`;
}

export function FilterModal({
  isOpen,
  onClose,
  initialFilters,
  onApply,
  totalMarketCount = 38,
}: FilterModalProps) {
  const { t, formatNumber } = useTranslations();
  const formatPriceNumber = (val: number): string => formatNumber(val);
  // Estado local para los filtros dentro del modal
  const [location, setLocation] = useState(initialFilters.query || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice ?? MIN_PRICE_LIMIT);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice ?? MAX_PRICE_LIMIT);
  const [minPriceText, setMinPriceText] = useState(formatPriceNumber(initialFilters.minPrice ?? MIN_PRICE_LIMIT));
  const [maxPriceText, setMaxPriceText] = useState(formatPriceNumber(initialFilters.maxPrice ?? MAX_PRICE_LIMIT));
  const [propertyType, setPropertyType] = useState(initialFilters.category || "");
  const [beds, setBeds] = useState(initialFilters.beds ?? 0);
  const [baths, setBaths] = useState(initialFilters.baths ?? 0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialFilters.amenities || []
  );

  const [previewCount, setPreviewCount] = useState<number>(totalMarketCount);
  const [, startTransition] = useTransition();

  // Manejar bloqueo de scroll y tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Previsualización dinámica del contador de resultados
  const fetchPreviewCount = useCallback(() => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (propertyType && propertyType !== "all") params.set("category", propertyType);
    if (minPrice > MIN_PRICE_LIMIT) params.set("minPrice", String(minPrice));
    if (maxPrice < MAX_PRICE_LIMIT) params.set("maxPrice", String(maxPrice));
    if (beds > 0) params.set("beds", String(beds));
    if (baths > 0) params.set("baths", String(baths));
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","));
    if (initialFilters.listingType && initialFilters.listingType !== "all") {
      params.set("listingType", initialFilters.listingType);
    }

    fetch(`/api/properties/count?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : { count: 0 }))
      .then((data) => {
        startTransition(() => {
          setPreviewCount(typeof data.count === "number" ? data.count : 0);
        });
      })
      .catch(() => {});
  }, [location, propertyType, minPrice, maxPrice, beds, baths, selectedAmenities, initialFilters.listingType]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      fetchPreviewCount();
    }, 250);
    return () => clearTimeout(timer);
  }, [isOpen, fetchPreviewCount]);

  if (!isOpen) return null;

  // Manejo de slider dual
  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - PRICE_STEP);
    setMinPrice(val);
    setMinPriceText(formatPriceNumber(val));
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + PRICE_STEP);
    setMaxPrice(val);
    setMaxPriceText(formatPriceNumber(val));
  };

  // Manejo de inputs de texto de precios
  const handleMinPriceBlur = () => {
    const parsed = parseInt(minPriceText.replace(/\D/g, ""), 10) || MIN_PRICE_LIMIT;
    const clamped = Math.max(MIN_PRICE_LIMIT, Math.min(parsed, maxPrice - PRICE_STEP));
    setMinPrice(clamped);
    setMinPriceText(formatPriceNumber(clamped));
  };

  const handleMaxPriceBlur = () => {
    const parsed = parseInt(maxPriceText.replace(/\D/g, ""), 10) || MAX_PRICE_LIMIT;
    const clamped = Math.min(MAX_PRICE_LIMIT, Math.max(parsed, minPrice + PRICE_STEP));
    setMaxPrice(clamped);
    setMaxPriceText(formatPriceNumber(clamped));
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleClear = () => {
    setLocation("");
    setMinPrice(MIN_PRICE_LIMIT);
    setMaxPrice(MAX_PRICE_LIMIT);
    setMinPriceText(formatPriceNumber(MIN_PRICE_LIMIT));
    setMaxPriceText(formatPriceNumber(MAX_PRICE_LIMIT));
    setPropertyType("");
    setBeds(0);
    setBaths(0);
    setSelectedAmenities([]);
  };

  const handleApply = () => {
    onApply({
      ...initialFilters,
      query: location.trim() || undefined,
      category: propertyType && propertyType !== "all" ? propertyType : undefined,
      minPrice: minPrice > MIN_PRICE_LIMIT ? minPrice : undefined,
      maxPrice: maxPrice < MAX_PRICE_LIMIT ? maxPrice : undefined,
      beds: beds > 0 ? beds : undefined,
      baths: baths > 0 ? baths : undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      page: 1, // Reset a la primera página con nuevos filtros
    });
    onClose();
  };

  // Porcentajes para la barra verde del slider
  const leftPercent = Math.max(
    0,
    Math.min(100, ((minPrice - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100)
  );
  const rightPercent = Math.max(
    0,
    Math.min(100, ((maxPrice - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <main className="relative z-50 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Header */}
        <header className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-30">
          <h1
            id="filter-modal-title"
            className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {t("filters.title")}
          </h1>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("filters.close")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
          >
            <Icon name="close" className="text-xl" />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scroll p-8 space-y-10">
          {/* Section 1: Location */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {t("filters.location")}
            </label>
            <div className="relative group">
              <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-mosque transition-colors pointer-events-none">
                location_on
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-[#f5f8f6] dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-mosque focus:bg-white dark:focus:bg-gray-800 transition-all shadow-xs outline-none"
                placeholder={t("filters.locationPlaceholder")}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </section>

          {/* Section 2: Price Range */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t("filters.priceRange")}
              </label>
              <span className="text-sm font-medium text-mosque">
                {formatPriceRangeLabel(minPrice, maxPrice, t("filters.allPrices"))}
              </span>
            </div>

            {/* Custom Interactive Dual Slider */}
            <div className="relative h-12 flex items-center mb-6 px-1">
              {/* Background bar */}
              <div className="absolute w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {/* Active green range bar */}
                <div
                  className="h-full bg-mosque transition-all"
                  style={{
                    marginLeft: `${leftPercent}%`,
                    width: `${Math.max(0, rightPercent - leftPercent)}%`,
                  }}
                />
              </div>

              {/* Slider Inputs overlay */}
              <input
                type="range"
                min={MIN_PRICE_LIMIT}
                max={MAX_PRICE_LIMIT}
                step={PRICE_STEP}
                value={minPrice}
                onChange={handleMinSliderChange}
                aria-label={t("filters.minPriceLabel")}
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none cursor-pointer z-20 range-thumb-interactive"
              />
              <input
                type="range"
                min={MIN_PRICE_LIMIT}
                max={MAX_PRICE_LIMIT}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={handleMaxSliderChange}
                aria-label={t("filters.maxPriceLabel")}
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none cursor-pointer z-20 range-thumb-interactive"
              />
            </div>

            {/* Min and Max Price Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f5f8f6] dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
                  {t("filters.minPrice")}
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm outline-none"
                    type="text"
                    value={minPriceText}
                    onChange={(e) => setMinPriceText(e.target.value)}
                    onBlur={handleMinPriceBlur}
                  />
                </div>
              </div>

              <div className="bg-[#f5f8f6] dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
                  {t("filters.maxPrice")}
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm outline-none"
                    type="text"
                    value={maxPriceText}
                    onChange={(e) => setMaxPriceText(e.target.value)}
                    onBlur={handleMaxPriceBlur}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Type Dropdown */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t("filters.propertyType")}
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#f5f8f6] dark:bg-gray-800 border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-mosque cursor-pointer outline-none text-sm font-medium"
                >
                  <option value="">{t("filters.anyType")}</option>
                  <option value="house">{t("categories.house")}</option>
                  <option value="apartment">{t("categories.apartment")}</option>
                  <option value="condo">{t("categories.condo")}</option>
                  <option value="townhouse">{t("categories.townhouse")}</option>
                  <option value="villa">{t("categories.villa")}</option>
                  <option value="penthouse">{t("categories.penthouse")}</option>
                </select>
                <span className="material-icons absolute right-3 top-3 text-gray-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Rooms: Beds & Baths */}
            <div className="space-y-4">
              {/* Beds */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t("filters.bedrooms")}
                </span>
                <div className="flex items-center space-x-3 bg-[#f5f8f6] dark:bg-gray-800 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setBeds((b) => Math.max(0, b - 1))}
                    disabled={beds === 0}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-xs flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Icon name="remove" className="text-base" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center text-gray-900 dark:text-white">
                    {beds === 0 ? t("common.any") : `${beds}+`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBeds((b) => Math.min(8, b + 1))}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-xs flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer"
                  >
                    <Icon name="add" className="text-base" />
                  </button>
                </div>
              </div>

              {/* Baths */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t("filters.bathrooms")}
                </span>
                <div className="flex items-center space-x-3 bg-[#f5f8f6] dark:bg-gray-800 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setBaths((b) => Math.max(0, b - 1))}
                    disabled={baths === 0}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-xs flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Icon name="remove" className="text-base" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center text-gray-900 dark:text-white">
                    {baths === 0 ? t("common.any") : `${baths}+`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBaths((b) => Math.min(8, b + 1))}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-xs flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer"
                  >
                    <Icon name="add" className="text-base" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Amenities */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              {t("filters.amenities")}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES_LIST.map((amenity) => {
                const isActive = selectedAmenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`relative w-full px-4 py-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? "border-mosque bg-mosque/5 dark:bg-mosque/20 text-mosque dark:text-hint-green shadow-xs"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <Icon
                      name={amenity.icon}
                      className={`text-lg transition-colors ${
                        isActive ? "text-mosque dark:text-hint-green" : "text-gray-400"
                      }`}
                    />
                    <span>{t(`amenities.${amenity.id}`)}</span>
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-mosque rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors underline decoration-gray-300 underline-offset-4 cursor-pointer"
          >
            {t("filters.clearAll")}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-mosque/30 transition-all hover:shadow-mosque/40 flex items-center gap-2 transform active:scale-95 cursor-pointer"
          >
            <span>
              {t(previewCount === 1 ? "filters.showHome" : "filters.showHomes", {
                count: previewCount,
              })}
            </span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </footer>
      </main>

      {/* Global CSS for the range slider thumbs to match code.html and screen.png */}
      <style jsx>{`
        .range-thumb-interactive::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #006655;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.15s ease-in-out;
        }
        .range-thumb-interactive::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .range-thumb-interactive::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #006655;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.15s ease-in-out;
        }
        .range-thumb-interactive::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
