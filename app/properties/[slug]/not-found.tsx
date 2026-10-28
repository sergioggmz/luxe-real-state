import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { getTranslator } from "@/i18n/server";

export default async function PropertyNotFound() {
  const { t } = await getTranslator();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-mosque/10 text-mosque rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-4xl">villa</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-nordic mb-3">
          {t("notFound.title")}
        </h1>
        <p className="text-nordic/70 max-w-md mx-auto mb-8 text-base">
          {t("notFound.text")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-mosque hover:bg-primary-hover text-white px-6 py-3.5 rounded-lg font-medium shadow-md shadow-mosque/20 transition-all cursor-pointer"
        >
          <span className="material-icons text-sm">arrow_back</span>
          <span>{t("notFound.backHome")}</span>
        </Link>
      </main>
    </>
  );
}
