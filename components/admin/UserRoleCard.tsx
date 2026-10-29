"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "@/i18n/I18nProvider";
import { updateUserRole } from "@/app/admin/users/actions";
import type { AppRole } from "@/lib/auth/roles";

export interface AdminUser {
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: AppRole;
}

const ROLES: AppRole[] = ["admin", "agent", "user"];

export function UserRoleCard({ user, isSelf }: { user: AdminUser; isSelf: boolean }) {
  const { t } = useTranslations();
  const [role, setRole] = useState<AppRole>(user.role);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [pending, startTransition] = useTransition();

  const labels: Record<AppRole, string> = {
    admin: t("admin.roleAdmin"),
    agent: t("admin.roleAgent"),
    user: t("admin.roleUser"),
  };
  const name = user.full_name || user.email || "—";

  function onChange(next: AppRole) {
    const previous = role;
    setRole(next);
    setMessage(null);
    startTransition(async () => {
      const res = await updateUserRole(user.user_id, next);
      if (res.ok) {
        setMessage({ text: t("admin.roleUpdated"), error: false });
      } else {
        setRole(previous);
        setMessage({ text: res.error || t("admin.roleError"), error: true });
      }
    });
  }

  return (
    <div
      className={`rounded-xl p-5 shadow-sm flex flex-col md:grid md:grid-cols-12 gap-4 items-center transition-colors ${
        role === "admin" ? "bg-active-green" : "bg-white hover:bg-active-green/50"
      }`}
    >
      <div className="md:col-span-6 flex items-center w-full min-w-0">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-[#E8AA8B] shrink-0 flex items-center justify-center border-2 border-white">
          {user.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar_url} alt={name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-semibold">{name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="ml-4 min-w-0">
          <div className="text-sm font-bold text-nordic-dark truncate">
            {name}
            {isSelf && <span className="ml-2 text-[10px] font-medium text-mosque">({t("admin.you")})</span>}
          </div>
          <div className="text-xs text-nordic-muted truncate">{user.email}</div>
        </div>
      </div>

      <div className="md:col-span-3 w-full">
        <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-mosque/10 text-mosque">
          {labels[role]}
        </span>
      </div>

      <div className="md:col-span-3 w-full flex flex-col items-end gap-1">
        <select
          aria-label={t("admin.changeRole")}
          value={role}
          disabled={pending}
          onChange={(e) => onChange(e.target.value as AppRole)}
          className="w-full md:w-auto px-3 py-2 rounded-lg border border-nordic-dark/10 bg-white text-xs font-medium text-nordic-dark cursor-pointer disabled:opacity-50"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {labels[r]}
            </option>
          ))}
        </select>
        <span
          role="status"
          className={`text-[11px] h-4 ${message?.error ? "text-red-600" : "text-mosque"}`}
        >
          {pending ? t("admin.saving") : message?.text}
        </span>
      </div>
    </div>
  );
}

