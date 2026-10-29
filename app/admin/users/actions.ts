"use server";

import { revalidatePath } from "next/cache";
import { isAppRole, requireAdmin } from "@/lib/auth/roles";

export async function updateUserRole(
  userId: string,
  role: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isAppRole(role) || !/^[0-9a-f-]{36}$/i.test(userId)) {
    return { ok: false, error: "Invalid input" };
  }

  const { supabase, user } = await requireAdmin();
  if (user.id === userId && role !== "admin") {
    return { ok: false, error: "You cannot remove your own admin role" };
  }

  // RLS (is_admin) + trigger guard_role_update refuerzan esto en la BD
  const { data, error } = await supabase
    .from("user_roles")
    .update({ role })
    .eq("user_id", userId)
    .select("user_id");

  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: "User not found" };

  revalidatePath("/admin/users");
  return { ok: true };
}

