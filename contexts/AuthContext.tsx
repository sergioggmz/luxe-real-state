"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  avatarUrl: string | null;
  displayName: string | null;
  provider: string | null;
  role: string | null;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [roleState, setRoleState] = useState<{ userId: string; role: string } | null>(null);

  // Rol del usuario (RLS permite leer solo la fila propia)
  const userId = user?.id ?? null;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setRoleState({ userId, role: (data?.role as string | undefined) ?? "user" });
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, userId]);
  const role = userId && roleState?.userId === userId ? roleState.role : null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const provider = useMemo(() => {
    if (!user) return null;

    // 1. Identificar por el emisor (iss) del token de la sesión actual
    // GitHub establece 'https://api.github.com' y Google 'https://accounts.google.com'
    const iss = user.user_metadata?.iss as string | undefined;
    if (iss) {
      if (iss.includes("github")) return "github";
      if (iss.includes("google")) return "google";
    }

    // 2. Identificar por el host del avatar activo en los metadatos de usuario
    const avatar = (user.user_metadata?.avatar_url as string | undefined) || "";
    if (avatar.includes("githubusercontent")) return "github";
    if (avatar.includes("googleusercontent")) return "google";

    // 3. Identificar por la identidad con timestamp más reciente (evaluando updated_at y last_sign_in_at)
    if (user.identities && user.identities.length > 0) {
      const getIdentityTime = (id: (typeof user.identities)[number]) => {
        const u = id.updated_at ? new Date(id.updated_at).getTime() : 0;
        const l = id.last_sign_in_at ? new Date(id.last_sign_in_at).getTime() : 0;
        const c = id.created_at ? new Date(id.created_at).getTime() : 0;
        return Math.max(u, l, c);
      };

      const sorted = [...user.identities].sort(
        (a, b) => getIdentityTime(b) - getIdentityTime(a)
      );
      const latest = sorted[0]?.provider;
      if (latest) return latest.toLowerCase();
    }

    // 4. Fallback al proveedor de registro original
    if (user.app_metadata?.provider) {
      return (user.app_metadata.provider as string).toLowerCase();
    }

    return null;
  }, [user]);

  const avatarUrl = useMemo(() => {
    if (!user) return null;
    // Si el proveedor activo es GitHub, priorizar avatar_url de GitHub
    if (provider === "github" && user.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url as string;
    }
    // Si el proveedor activo es Google, priorizar picture o avatar_url de Google
    if (provider === "google") {
      return (
        (user.user_metadata?.picture as string) ||
        (user.user_metadata?.avatar_url as string) ||
        null
      );
    }
    return (
      (user.user_metadata?.avatar_url as string) ||
      (user.user_metadata?.picture as string) ||
      null
    );
  }, [user, provider]);

  const displayName = useMemo(() => {
    if (!user) return null;
    return (
      (user.user_metadata?.full_name as string) ||
      (user.user_metadata?.name as string) ||
      (user.user_metadata?.user_name as string) ||
      user.email ||
      "User"
    );
  }, [user]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        avatarUrl,
        displayName,
        provider,
        role,
        signInWithGoogle,
        signInWithGithub,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
