"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PropertyImage } from "@/types/property";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
  badge?: string;
  isFeatured?: boolean;
}

export function PropertyGallery({
  images,
  title,
  badge,
  isFeatured,
}: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Garantizar que siempre haya al menos una imagen
  const displayImages =
    images && images.length > 0
      ? images
      : [
          {
            id: "fallback",
            propertyId: "",
            imageUrl:
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
            imageAlt: title,
            displayOrder: 0,
          },
        ];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
  }, [displayImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
  }, [displayImages.length]);

  // Soporte de navegación por teclado en Lightbox (Esc, Flechas)
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  return (
    <div className="space-y-4">
      {/* Hero Image Container */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group cursor-pointer bg-slate-100"
      >
        <Image
          src={currentImage.imageUrl}
          alt={currentImage.imageAlt || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {isFeatured && (
            <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Premium
            </span>
          )}
          <span className="bg-white/90 backdrop-blur text-nordic text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {badge || "New"}
          </span>
        </div>

        {/* View All Photos Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2 cursor-pointer z-10"
        >
          <span className="material-icons text-sm">grid_view</span>
          <span>View All Photos ({displayImages.length})</span>
        </button>
      </div>

      {/* Thumbnails Strip (1 to n images) */}
      {displayImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
          {displayImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer snap-start relative transition-all duration-200 text-left ${
                  isSelected
                    ? "ring-2 ring-mosque ring-offset-2 ring-offset-clear-day opacity-100 shadow-sm"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.imageUrl}
                  alt={img.imageAlt || `${title} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-medium truncate max-w-md">{title}</h3>
              <p className="text-sm text-white/60">
                Photo {selectedIndex + 1} of {displayImages.length}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-icons text-xl text-white">close</span>
            </button>
          </div>

          {/* Main Photo Area */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            {displayImages.length > 1 && (
              <button
                type="button"
                aria-label="Previous photo"
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white backdrop-blur-sm transition-all cursor-pointer"
              >
                <span className="material-icons text-3xl">chevron_left</span>
              </button>
            )}

            {/* Current Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage.imageUrl}
                alt={currentImage.imageAlt || title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Next Button */}
            {displayImages.length > 1 && (
              <button
                type="button"
                aria-label="Next photo"
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white backdrop-blur-sm transition-all cursor-pointer"
              >
                <span className="material-icons text-3xl">chevron_right</span>
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {displayImages.length > 1 && (
            <div className="flex gap-2 justify-center overflow-x-auto py-2 scrollbar-hide max-w-4xl mx-auto">
              {displayImages.map((img, idx) => (
                <button
                  key={`lightbox-thumb-${img.id || idx}`}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-16 h-12 rounded overflow-hidden flex-none transition-all ${
                    idx === selectedIndex
                      ? "ring-2 ring-white scale-105 opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

