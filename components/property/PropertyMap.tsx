"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "@/i18n/I18nProvider";

interface PropertyMapProps {
  latitude?: number;
  longitude?: number;
  title: string;
  address?: string;
}

export function PropertyMap({
  latitude = 37.7749,
  longitude = -122.4194,
  title,
  address,
}: PropertyMapProps) {
  const { t } = useTranslations();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isMounted = true;
    let mapInstance: import("leaflet").Map | null = null;

    // Carga asíncrona de Leaflet en el cliente para evitar problemas de SSR
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Si ya hay un mapa montado, desmontarlo antes
      if (mapContainerRef.current.classList.contains("leaflet-container")) {
        return;
      }

      mapInstance = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 14,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      // Capa de mosaicos abierta de OpenStreetMap (libre, sin necesidad de API key)
      // Si se define NEXT_PUBLIC_CARTO_API_KEY se usa CartoDB Voyager
      const cartoKey =
        typeof process !== "undefined"
          ? process.env.NEXT_PUBLIC_CARTO_API_KEY
          : undefined;
      const tileUrl = cartoKey
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${cartoKey}`
        : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: cartoKey ? "abcd" : "abc",
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      // Pin personalizado con el color de marca #006655 y el icono 'home'
      const customPin = L.divIcon({
        className: "property-leaflet-marker",
        html: `
          <div style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; background-color: #006655; border: 3px solid #ffffff; border-radius: 9999px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); transform: translate(-50%, -50%);">
            <span style="font-family: 'Material Icons'; font-size: 16px; color: #ffffff; line-height: 1;">home</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker([latitude, longitude], { icon: customPin })
        .addTo(mapInstance)
        .bindPopup(
          `<div style="font-family: inherit; font-size: 13px; font-weight: 600; color: #19322F;">${title}</div>`
        );

      setMapLoaded(true);
    });

    return () => {
      isMounted = false;
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [latitude, longitude, title]);

  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="bg-white p-2 rounded-xl shadow-sm border border-mosque/5">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Fallback de carga antes de que Leaflet inicialice */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <div className="w-8 h-8 bg-mosque rounded-full border-4 border-white shadow-lg animate-bounce flex items-center justify-center">
              <span className="material-icons text-white text-sm">home</span>
            </div>
          </div>
        )}

        {/* Botón flotante para ver en mapa externo */}
        <a
          href={mapExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-xs font-medium px-2.5 py-1.5 rounded shadow-sm text-nordic hover:text-mosque transition-colors z-10 flex items-center gap-1 backdrop-blur-xs cursor-pointer"
        >
          <span className="material-icons text-xs">open_in_new</span>
          <span>{t("property.viewOnMap")}</span>
        </a>
      </div>
      {address && (
        <p className="text-xs text-nordic/60 px-2 pt-2 truncate flex items-center gap-1">
          <span className="material-icons text-xs text-mosque">place</span>
          <span>{address}</span>
        </p>
      )}
    </div>
  );
}

