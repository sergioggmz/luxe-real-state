import { Suspense } from "react";
import Link from "next/link";
import { getTranslator } from "@/i18n/server";
import { getAdminProperties } from "@/lib/properties";

const PAGE_SIZE = 10;

type SP = Promise<{ q?: string; type?: string; page?: string }>;

async function AdminPropertiesPageContent({ searchParams }: { searchParams: SP }) {
  const { t } = await getTranslator();
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const type = sp.type === "sale" || sp.type === "rent" ? sp.type : "all";
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const { properties, totalCount } = await getAdminProperties({
    page,
    pageSize: PAGE_SIZE,
    query: q,
    listingType: type,
  });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const href = (p: number, nextType = type) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (nextType !== "all") params.set("type", nextType);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return `/admin/properties${s ? `?${s}` : ""}`;
  };

  const tabs = [
    { id: "all", label: t("admin.all") },
    { id: "sale", label: t("admin.sale") },
    { id: "rent", label: t("admin.rent") },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic-dark">{t("admin.propertiesTitle")}</h1>
          <p className="text-sm text-nordic-muted mt-1">
            {t("admin.propertiesSubtitle")} · {totalCount} {t("admin.total")}
          </p>
        </div>
        <form className="flex gap-2 w-full md:w-96" action="/admin/properties">
          {type !== "all" && <input type="hidden" name="type" value={type} />}
          <input
            name="q"
            defaultValue={q}
            placeholder={t("admin.searchProperties")}
            className="flex-1 px-3 py-2.5 rounded-lg bg-white shadow-soft text-sm focus:outline-none focus:ring-2 focus:ring-mosque"
          />
          <button className="px-4 py-2.5 rounded-lg border border-mosque text-mosque text-sm font-medium hover:bg-mosque/5 transition-colors cursor-pointer">
            {t("admin.filter")}
          </button>
        </form>
      </div>

      <div className="flex gap-6 border-b border-nordic-dark/10">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={href(1, tab.id)}
            className={`pb-3 text-sm font-medium ${
              type === tab.id
                ? "text-mosque border-b-2 border-mosque font-semibold"
                : "text-nordic-muted hover:text-nordic-dark"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-nordic-muted border-b border-nordic-dark/10">
              <th className="px-5 py-3 font-semibold">{t("admin.colProperty")}</th>
              <th className="px-5 py-3 font-semibold">{t("admin.colLocation")}</th>
              <th className="px-5 py-3 font-semibold">{t("admin.colType")}</th>
              <th className="px-5 py-3 font-semibold">{t("admin.colCategory")}</th>
              <th className="px-5 py-3 font-semibold">{t("admin.colPrice")}</th>
              <th className="px-5 py-3 font-semibold">{t("admin.colFeatured")}</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-b border-nordic-dark/5 last:border-0 hover:bg-active-green/40 transition-colors">
                <td className="px-5 py-3">
                  <Link href={`/properties/${p.slug}`} className="flex items-center gap-3 min-w-56">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageUrl} alt={p.imageAlt} className="w-14 h-10 rounded-md object-cover" />
                    <span className="font-semibold text-nordic-dark line-clamp-1">{p.title}</span>
                  </Link>
                </td>
                <td className="px-5 py-3 text-nordic-muted">{p.location.fullLocation || p.location.city}</td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-mosque/10 text-mosque">
                    {p.listingType === "sale" ? t("admin.sale") : t("admin.rent")}
                  </span>
                </td>
                <td className="px-5 py-3 capitalize text-nordic-muted">{p.category}</td>
                <td className="px-5 py-3 font-semibold text-nordic-dark whitespace-nowrap">
                  {p.priceFormatted}
                  {p.rentalPeriod ? `/${p.rentalPeriod}` : ""}
                </td>
                <td className="px-5 py-3">
                  {p.isFeatured && (
                    <span className="material-symbols-outlined text-mosque text-lg" title={t("admin.featured")}>
                      star
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-nordic-muted">
                  {t("admin.noResults")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-nordic-muted">
        <span>
          {t("admin.page")} {page} {t("admin.of")} {totalPages}
        </span>
        <div className="flex gap-2">
          {page > 1 && (
            <Link href={href(page - 1)} className="px-4 py-2 rounded-lg bg-white shadow-soft hover:text-mosque">
              {t("admin.prev")}
            </Link>
          )}
          {page < totalPages && (
            <Link href={href(page + 1)} className="px-4 py-2 rounded-lg bg-white shadow-soft hover:text-mosque">
              {t("admin.next")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}


// searchParams y la sesión son datos dinámicos: se resuelven dentro de <Suspense>
export default function AdminPropertiesPage(props: { searchParams: SP }) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-mosque border-t-transparent animate-spin" />
        </div>
      }
    >
      <AdminPropertiesPageContent searchParams={props.searchParams} />
    </Suspense>
  );
}
