import { Suspense } from "react";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/roles";
import { AdminNav } from "@/components/admin/AdminNav";

// Defensa en profundidad: re-verifica el rol aunque proxy.ts ya haya filtrado.
// Es contenido dinámico (sesión), por eso va dentro de <Suspense>.
async function AdminGuard({ children }: { children: React.ReactNode }) {
  await connection();
  await requireAdmin();
  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-mosque border-t-transparent animate-spin" />
            </div>
          }
        >
          <AdminGuard>{children}</AdminGuard>
        </Suspense>
      </main>
    </>
  );
}
