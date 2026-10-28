import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  matchLocale,
} from "@/i18n/config";

// Primera visita: detecta el idioma del navegador y lo guarda en una cookie
export function proxy(request: NextRequest) {
  const current = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(current)) return NextResponse.next();

  const locale = matchLocale(request.headers.get("accept-language"));

  // Reenviamos la cookie en la propia petición para que ya esté disponible en este render
  const headers = new Headers(request.headers);
  const existing = headers.get("cookie");
  headers.set(
    "cookie",
    `${existing ? `${existing}; ` : ""}${LOCALE_COOKIE}=${locale}`
  );

  const response = NextResponse.next({ request: { headers } });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

