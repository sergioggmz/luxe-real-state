import { Suspense } from "react";
import Link from "next/link";
import { getTranslator } from "@/i18n/server";
import { requireAdmin, isAppRole } from "@/lib/auth/roles";
import { UserRoleCard, type AdminUser } from "@/components/admin/UserRoleCard";

type SP = Promise<{ q?: string; role?: string }>;

async function AdminUsersPageContent({ searchParams }: { searchParams: SP }) {
  const { t } = await getTranslator();
  const { supabase, user: me } = await requireAdmin();
  const sp = await searchParams;
  const q = sp.q?.trim().replace(/[,()%]/g, " ") ?? "";
  const role = isAppRole(sp.role) ? sp.role : "all";

  let query = supabase
    .from("user_roles")
    .select("user_id,email,full_name,avatar_url,role")
    .order("created_at", { ascending: false });
  if (role !== "all") query = query.eq("role", role);
  if (q) query = query.or(`email.ilike.%${q}%,full_name.ilike.%${q}%`);

  const { data } = await query;
  const users = (data ?? []) as AdminUser[];

  const tabs = [
    { id: "all", label: t("admin.allUsers") },
    { id: "admin", label: t("admin.admins") },
    { id: "agent", label: t("admin.agents") },
    { id: "user", label: t("admin.regularUsers") },
  ];
  const href = (r: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (r !== "all") params.set("role", r);
    const s = params.toString();
    return `/admin/users${s ? `?${s}` : ""}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic-dark">{t("admin.usersTitle")}</h1>
          <p className="text-sm text-nordic-muted mt-1">{t("admin.usersSubtitle")}</p>
        </div>
        <form className="flex gap-2 w-full md:w-96" action="/admin/users">
          {role !== "all" && <input type="hidden" name="role" value={role} />}
          <input
            name="q"
            defaultValue={q}
            placeholder={t("admin.searchUsers")}
            className="flex-1 px-3 py-2.5 rounded-lg bg-white shadow-soft text-sm focus:outline-none focus:ring-2 focus:ring-mosque"
          />
          <button className="px-4 py-2.5 rounded-lg border border-mosque text-mosque text-sm font-medium hover:bg-mosque/5 transition-colors cursor-pointer">
            {t("admin.filter")}
          </button>
        </form>
      </div>

      <div className="flex gap-6 border-b border-nordic-dark/10 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={href(tab.id)}
            className={`pb-3 text-sm whitespace-nowrap ${
              role === tab.id
                ? "text-mosque border-b-2 border-mosque font-semibold"
                : "text-nordic-muted hover:text-nordic-dark font-medium"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <UserRoleCard key={u.user_id} user={u} isSelf={u.user_id === me.id} />
        ))}
        {users.length === 0 && (
          <p className="text-center text-nordic-muted py-10">{t("admin.noResults")}</p>
        )}
      </div>
    </div>
  );
}


// searchParams y la sesión son datos dinámicos: se resuelven dentro de <Suspense>
export default function AdminUsersPage(props: { searchParams: SP }) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-mosque border-t-transparent animate-spin" />
        </div>
      }
    >
      <AdminUsersPageContent searchParams={props.searchParams} />
    </Suspense>
  );
}
