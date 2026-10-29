"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { t } = useTranslations();
  const { user, avatarUrl, displayName, provider, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

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

          {/* Center: Navigation Links */}
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

          {/* Right: Search, Notifications, Divider, Profile/Login & Language Selector */}
          <div className="flex-1 flex items-center justify-end space-x-4 sm:space-x-5">
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

            {/* Subtle Vertical Divider */}
            <div className="w-[1px] h-6 bg-nordic-dark/15 ml-1 mr-2.5 sm:ml-1.5 sm:mr-3" />

            {/* Profile Avatar (when logged in) OR Login button (when not logged in) */}
            {loading ? (
              <div className="w-16 h-8 rounded-full bg-nordic-dark/5 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  aria-label={t("navbar.userProfile")}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-mosque/40 hover:ring-mosque transition-all cursor-pointer shadow-xs flex items-center justify-center bg-[#E8AA8B]"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName || "User avatar"}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-white text-sm font-semibold">
                      {displayName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-soft border border-nordic-dark/10 py-2 z-50 text-nordic-dark">
                    <div className="px-4 py-3 border-b border-nordic-dark/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E8AA8B] ring-1 ring-nordic-dark/10 shrink-0 flex items-center justify-center">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={displayName || "User"}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="text-white text-base font-semibold">
                              {displayName?.charAt(0).toUpperCase() || "U"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold truncate text-nordic-dark">
                            {displayName}
                          </p>
                          <p className="text-xs text-nordic-muted truncate">
                            {user.email}
                          </p>
                          {provider && (
                            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-mosque/10 text-mosque">
                              {provider === "google"
                                ? "Google"
                                : provider === "github"
                                ? "GitHub"
                                : provider}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={async () => {
                          setUserMenuOpen(false);
                          await signOut();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>{t("navbar.signOut")}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-mosque hover:bg-primary-dark rounded-full transition-all duration-200 shadow-xs hover:shadow-soft cursor-pointer"
              >
                {t("navbar.signIn")}
              </Link>
            )}

            {/* Language Selector */}
            <LanguageSwitcher />

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
          mobileMenuOpen ? "max-h-96 border-t border-[#19322F]/10" : "max-h-0"
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

          <div className="pt-2 pb-1 border-t border-[#19322F]/10">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#E8AA8B] shrink-0">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName || "User"}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-white text-xs font-semibold">
                        {displayName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-nordic-dark truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-nordic-muted truncate">{user.email}</p>
                    {provider && (
                      <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-mosque/10 text-mosque">
                        {provider === "google"
                          ? "Google"
                          : provider === "github"
                          ? "GitHub"
                          : provider}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await signOut();
                  }}
                  className="text-xs text-red-600 font-medium px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
                >
                  {t("navbar.signOut")}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-mosque hover:bg-primary-dark transition-colors cursor-pointer"
              >
                {t("navbar.signIn")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
