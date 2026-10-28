"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Navbar() {
  const { t } = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");

  const navLinks = [
    { id: "buy", label: t("navbar.buy") },
    { id: "rent", label: t("navbar.rent") },
    { id: "sell", label: t("navbar.sell") },
    { id: "savedHomes", label: t("navbar.savedHomes") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#EEF6F6]/95 backdrop-blur-md border-b border-[#19322F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo (circular dark badge + LuxeEstate text) */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-nordic-dark flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                {/* Building / Real Estate Icon */}
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 2H9c-1.1 0-2 .9-2 2v4H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 20v-8h2v8H5zm8 0h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z" />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight text-nordic-dark">
                LuxeEstate
              </span>
            </Link>
          </div>

          {/* Center: Perfectly Centered Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setActiveTab(link.id)}
                  className={`text-sm font-medium transition-all px-1 py-1 cursor-pointer ${
                    isActive
                      ? "text-mosque border-b-2 border-mosque font-medium"
                      : "text-nordic-muted hover:text-nordic-dark hover:border-b-2 hover:border-nordic-dark/20"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right: Search, Notifications with red badge, Divider & Profile Avatar */}
          <div className="flex-1 flex items-center justify-end space-x-5">
            {/* Search Button */}
            <button
              type="button"
              aria-label={t("navbar.search")}
              className="text-nordic-dark hover:text-mosque transition-colors cursor-pointer p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </button>

            {/* Notification Bell with Red Indicator Dot */}
            <button
              type="button"
              aria-label={t("navbar.notifications")}
              className="text-nordic-dark hover:text-mosque transition-colors cursor-pointer relative p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FF3B30] rounded-full" />
            </button>

            {/* Language Selector */}
            <LanguageSwitcher />

            {/* Subtle Vertical Divider */}
            <div className="w-[1px] h-6 bg-nordic-dark/15 mx-0.5" />

            {/* Profile Avatar (Warm Peach Circle with Minimal Portrait Line-art) */}
            <button
              type="button"
              aria-label={t("navbar.userProfile")}
              className="w-9 h-9 rounded-full bg-[#E8AA8B] flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all cursor-pointer shadow-xs"
            >
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect width="36" height="36" fill="#E8AA8B" />
                <path
                  d="M21 9C17 9 14 11 13.5 14C13.2 15.5 13.8 16.5 13.5 17.5C13.2 18.2 12.5 18.5 12.5 19.2C12.5 19.8 13.2 20 13.2 20.5C13.2 21 12.8 21.3 13.2 22C13.6 22.7 14.5 22.8 15 23.5C15.5 24.2 15.5 26 15.5 28M20 28C20 25 21 23 21 21M17 17C17.5 17 18 17.5 18 18.5C18 19.5 17.5 20 16.5 20"
                  stroke="#B57150"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5 14C15 13.5 18 13.5 20.5 14.5C22.5 15.3 23.5 17.5 23.5 20C23.5 23 21.5 25 20 25.5"
                  stroke="#B57150"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              aria-label={t("navbar.toggleMenu")}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-nordic-dark hover:text-mosque transition-colors ml-1 p-1 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-[#EEF6F6] overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-60 border-t border-[#19322F]/10" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-mosque bg-mosque/10"
                    : "text-nordic-dark hover:bg-black/5"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
