import { Navbar } from "@/components/layout/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Media Skeleton */}
          <div className="lg:col-span-8 space-y-4">
            <div className="aspect-[16/10] w-full rounded-xl bg-slate-200" />
            <div className="flex gap-4 overflow-hidden pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-none w-48 aspect-[4/3] rounded-lg bg-slate-200"
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="lg:col-span-4 relative">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
                <div className="h-10 w-44 bg-slate-200 rounded" />
                <div className="h-4 w-60 bg-slate-100 rounded" />
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                    <div className="h-3 w-20 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="h-12 w-full bg-slate-200 rounded-lg" />
                  <div className="h-12 w-full bg-slate-100 rounded-lg" />
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                <div className="aspect-[4/3] w-full rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Lower Features & Content Skeleton */}
          <div className="lg:col-span-8 lg:row-start-2 -mt-8 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="h-6 w-40 bg-slate-200 rounded mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-slate-100 rounded-lg" />
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-4">
              <div className="h-6 w-36 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
              <div className="h-4 w-4/6 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

