import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  matchLocale,
} from "@/i18n/config";

const localeCookieOptions = {
  path: "/",
  maxAge: LOCALE_COOKIE_MAX_AGE,
  sameSite: "lax" as const,
};

export async function proxy(request: NextRequest) {
  // 1) Idioma: primera visita detecta el idioma del navegador y lo guarda en una cookie
  let newLocale: string | null = null;
  if (!isLocale(request.cookies.get(LOCALE_COOKIE)?.value)) {
    newLocale = matchLocale(request.headers.get("accept-language"));
    // Disponible ya en este render
    request.cookies.set(LOCALE_COOKIE, newLocale);
  }

  let response = NextResponse.next({ request });
  if (newLocale) response.cookies.set(LOCALE_COOKIE, newLocale, localeCookieOptions);

  // 2) Control de acceso por rol: solo para /admin
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            if (newLocale) response.cookies.set(LOCALE_COOKIE, newLocale, localeCookieOptions);
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // getUser() valida el token con Supabase (getSession no es fiable en servidor)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.search = `?next=${encodeURIComponent(pathname + request.nextUrl.search)}`;
      return NextResponse.redirect(url);
    }

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
