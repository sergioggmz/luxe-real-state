"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useTranslations } from "@/i18n/I18nProvider";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslations();
  const [statusMessage, setStatusMessage] = useState<string>("auth.completingLogin");

  useEffect(() => {
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error || errorDescription) {
      const message = errorDescription || error || "Authentication error";
      router.replace(`/login?error=${encodeURIComponent(message)}`);
      return;
    }

    const supabase = getSupabaseBrowserClient();

    // El cliente (PKCE) intercambia el `code` de la URL automáticamente al inicializarse;
    // getSession() espera a que termine. Un segundo exchange manual fallaría (verifier ya consumido).
    supabase.auth
      .getSession()
      .then(({ data: { session }, error: sessionError }) => {
        if (session) {
          router.replace("/");
        } else {
          router.replace(
            `/login?error=${encodeURIComponent(sessionError?.message || "Authentication failed")}`
          );
        }
      })
      .catch((err: unknown) => {
        router.replace(
          `/login?error=${encodeURIComponent(
            err instanceof Error ? err.message : "Exchange failed"
          )}`
        );
      });
  }, [router, searchParams]);

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4 antialiased text-nordic dark:text-gray-100">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl mb-6 shadow-soft text-white animate-pulse">
        <span className="material-symbols-rounded text-3xl">real_estate_agent</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-nordic-muted dark:text-gray-400">
        <svg
          className="w-5 h-5 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <span>{t(statusMessage)}</span>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}

