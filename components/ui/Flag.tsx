import React from "react";
import { Locale } from "@/i18n/config";

interface FlagProps {
  locale: Locale;
  className?: string;
}

export function Flag({ locale, className = "" }: FlagProps) {
  if (locale === "es") {
    // Bandera de España (Rojo, Amarillo, Rojo en proporción 1:2:1 con corona/emblema esquemático)
    return (
      <svg
        viewBox="0 0 30 20"
        className={`inline-block shrink-0 rounded-[2px] shadow-xs border border-black/10 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <rect width="30" height="20" fill="#AA151B" />
        <rect y="5" width="30" height="10" fill="#F1BF00" />
        {/* Emblema simplificado */}
        <g transform="translate(6, 7) scale(0.65)">
          <path
            d="M2 3h6v4a3 3 0 0 1-6 0V3z"
            fill="#AA151B"
            stroke="#19322F"
            strokeWidth="0.5"
          />
          <path d="M5 1v2M3 2h4" stroke="#F1BF00" strokeWidth="0.6" />
        </g>
      </svg>
    );
  }

  if (locale === "en") {
    // Bandera del Reino Unido (Union Jack)
    return (
      <svg
        viewBox="0 0 30 20"
        className={`inline-block shrink-0 rounded-[2px] shadow-xs border border-black/10 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <clipPath id="uk-clip">
          <rect width="30" height="20" rx="1" />
        </clipPath>
        <g clipPath="url(#uk-clip)">
          {/* Fondo azul */}
          <rect width="30" height="20" fill="#012169" />
          {/* Aspas blancas (San Andrés) */}
          <path d="M0 0 L30 20 M30 0 L0 20" stroke="#FFFFFF" strokeWidth="4" />
          {/* Aspas rojas (San Patricio) */}
          <path d="M0 0 L30 20 M30 0 L0 20" stroke="#C8102E" strokeWidth="2" />
          {/* Cruz blanca (San Jorge fondo) */}
          <path d="M15 0 v20 M0 10 h30" stroke="#FFFFFF" strokeWidth="6" />
          {/* Cruz roja (San Jorge) */}
          <path d="M15 0 v20 M0 10 h30" stroke="#C8102E" strokeWidth="3.6" />
        </g>
      </svg>
    );
  }

  if (locale === "fr") {
    // Bandera de Francia (Azul, Blanco, Rojo tricolor vertical)
    return (
      <svg
        viewBox="0 0 30 20"
        className={`inline-block shrink-0 rounded-[2px] shadow-xs border border-black/10 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <rect width="10" height="20" fill="#002654" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#ED2939" />
      </svg>
    );
  }

  return null;
}

