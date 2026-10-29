import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const APP_ROLES = ["admin", "agent", "user"] as const;
export type AppRole = (typeof APP_ROLES)[number];

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && (APP_ROLES as readonly string[]).includes(value);
}

// Devuelve el usuario verificado (getUser valida el JWT contra Supabase) y su rol
export async function getCurrentUserRole() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, role: null as AppRole | null };

  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return { supabase, user, role: isAppRole(data?.role) ? data.role : ("user" as AppRole) };
}

// Defensa en profundidad: el proxy ya filtra, pero se re-verifica en layout y acciones
export async function requireAdmin() {
  const ctx = await getCurrentUserRole();
  if (!ctx.user) redirect("/login");
  if (ctx.role !== "admin") notFound();
  return ctx as typeof ctx & { user: NonNullable<typeof ctx.user> };
}

