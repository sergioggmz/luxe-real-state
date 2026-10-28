"use client";

import { useState } from "react";
import Image from "next/image";
import { Property, PropertyAgent } from "@/types/property";
import { useTranslations } from "@/i18n/I18nProvider";
import { getAgentTitle } from "@/i18n/labels";

interface PropertyAgentCardProps {
  property: Property;
}

export function PropertyAgentCard({ property }: PropertyAgentCardProps) {
  const { t, has } = useTranslations();
  const [modalOpen, setModalOpen] = useState<"visit" | "contact" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const defaultAgent: PropertyAgent = {
    name: "Sarah Jenkins",
    title: t("agent.topRated"),
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w",
    phone: "+1 (555) 234-5678",
    email: "sarah.jenkins@luxeestate.com",
  };

  const agent = property.agent || defaultAgent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(null);
    }, 2500);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-mosque/5">
        {/* Price & Location Header */}
        <div className="mb-4">
          <h1 className="text-4xl font-display font-light text-nordic mb-2">
            {property.priceFormatted}
            {property.rentalPeriod && (
              <span className="text-xl font-normal text-nordic/60">
                /{property.rentalPeriod === "yr" ? t("common.perYearShort") : t("common.perMonthShort")}
              </span>
            )}
          </h1>
          <p className="text-nordic/60 font-medium flex items-center gap-1 text-sm">
            <span className="material-icons text-mosque text-base">location_on</span>
            <span>{property.location.fullLocation}</span>
          </p>
        </div>

        <div className="h-px bg-slate-100 my-6" />

        {/* Agent Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-none">
            <Image
              src={agent.avatar}
              alt={agent.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold text-nordic text-base">{agent.name}</h3>
            <div className="flex items-center gap-1 text-xs text-mosque font-medium">
              <span className="material-icons text-[14px]">star</span>
              <span>{getAgentTitle(agent.title, t, has)}</span>
            </div>
          </div>

          {/* Quick Contact Icons */}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              aria-label={t("agent.chatWith", { name: agent.name })}
              onClick={() => setModalOpen("contact")}
              className="p-2.5 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-icons text-sm">chat</span>
            </button>
            <a
              href={`tel:${agent.phone}`}
              aria-label={t("agent.call", { name: agent.name })}
              className="p-2.5 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              <span className="material-icons text-sm">call</span>
            </a>
          </div>
        </div>

        {/* Primary & Secondary Action CTAs */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setModalOpen("visit")}
            className="w-full bg-mosque hover:bg-primary-hover text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span className="material-icons text-xl group-hover:scale-110 transition-transform">
              calendar_today
            </span>
            <span>{t("agent.scheduleVisit")}</span>
          </button>

          <button
            type="button"
            onClick={() => setModalOpen("contact")}
            className="w-full bg-transparent border border-nordic/15 hover:border-mosque text-nordic/80 hover:text-mosque py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-icons text-xl">mail_outline</span>
            <span>{t("agent.contactAgent")}</span>
          </button>
        </div>
      </div>

      {/* Interactive Contact / Schedule Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            <button
              type="button"
              onClick={() => setModalOpen(null)}
              aria-label={t("agent.close")}
              className="absolute top-4 right-4 text-nordic/40 hover:text-nordic cursor-pointer"
            >
              <span className="material-icons">close</span>
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-mosque/10 text-mosque rounded-full flex items-center justify-center mx-auto">
                  <span className="material-icons text-2xl">check</span>
                </div>
                <h3 className="text-xl font-bold text-nordic">{t("agent.requestReceived")}</h3>
                <p className="text-sm text-nordic/60">
                  {t("agent.notified", { name: agent.name })}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-nordic mb-1">
                  {modalOpen === "visit" ? t("agent.scheduleTitle") : t("agent.contactTitle")}
                </h3>
                <p className="text-xs text-nordic/60 mb-6">
                  {property.title} · {property.location.city}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-nordic/70 uppercase tracking-wider mb-1">
                      {t("agent.fullName")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("agent.fullNamePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-mosque text-sm text-nordic"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-nordic/70 uppercase tracking-wider mb-1">
                      {t("agent.email")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-mosque text-sm text-nordic"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-nordic/70 uppercase tracking-wider mb-1">
                      {t("agent.phone")}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-mosque text-sm text-nordic"
                    />
                  </div>

                  {modalOpen === "visit" && (
                    <div>
                      <label className="block text-xs font-semibold text-nordic/70 uppercase tracking-wider mb-1">
                        {t("agent.preferredDate")}
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-mosque text-sm text-nordic"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-mosque hover:bg-primary-hover text-white py-3.5 rounded-lg font-medium transition-all shadow-md shadow-mosque/20 cursor-pointer mt-2"
                  >
                    {modalOpen === "visit" ? t("agent.confirmVisit") : t("agent.confirmMessage")}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

