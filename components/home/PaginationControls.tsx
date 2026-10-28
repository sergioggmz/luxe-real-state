"use client";

import { useTranslations } from "@/i18n/I18nProvider";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: PaginationControlsProps) {
  const { t } = useTranslations();

  if (totalPages <= 1) {
    return (
      <div className="mt-12 text-center text-sm text-nordic-muted font-light">
        {t("pagination.showingAll", { count: totalCount })}
      </div>
    );
  }

  // Genera array de páginas con ellipsis para muchas páginas
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {/* Botón Anterior */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border border-nordic-dark/10 text-sm font-medium text-nordic-dark transition-all hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark cursor-pointer"
        >
          {t("pagination.prev")}
        </button>

        {/* Páginas numeradas */}
        {pageNumbers.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-nordic-muted text-sm select-none"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-mosque text-white shadow-sm"
                  : "border border-nordic-dark/10 text-nordic-dark hover:border-mosque hover:text-mosque"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Botón Siguiente */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border border-nordic-dark/10 text-sm font-medium text-nordic-dark transition-all hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark cursor-pointer"
        >
          {t("pagination.next")}
        </button>
      </div>

      {/* Info de paginación */}
      <p className="text-xs text-nordic-muted">
        {t("pagination.info", { current: currentPage, total: totalPages, count: totalCount })}
      </p>
    </div>
  );
}

