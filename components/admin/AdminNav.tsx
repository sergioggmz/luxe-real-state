"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/i18n/I18nProvider";

export function AdminNav() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const links = [
    { href: "/admin/properties", label: t("admin.properties") },
    { href: "/admin/users", label: t("admin.users") },
  ];

  return (
    <nav className="bg-white border-b border-nordic-dark/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-mosque text-2xl">apartment</span>
            <span className="font-bold text-lg text-nordic-dark tracking-tight">
              LuxeEstate <span className="text-nordic-muted font-medium text-sm">· {t("admin.title")}</span>
            </span>
          </Link>
          <div className="hidden sm:flex gap-6">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-1 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-mosque border-b-2 border-mosque"
                      : "text-nordic-muted hover:text-mosque"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
        <Link href="/" className="text-sm text-nordic-muted hover:text-mosque transition-colors">
          {t("admin.backToSite")}
        </Link>
      </div>
      <div className="sm:hidden flex gap-6 px-4 pb-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm font-medium ${pathname.startsWith(l.href) ? "text-mosque" : "text-nordic-muted"}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

