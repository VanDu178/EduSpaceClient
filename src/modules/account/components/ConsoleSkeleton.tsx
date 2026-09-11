export function ConsoleSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100/60 py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Skeleton */}
        <div className="pb-4 border-b border-slate-200/80 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-48" />
          <div className="h-8 bg-slate-200 rounded-lg w-64" />
        </div>

        {/* Console Main Body Grid */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left Sidebar Skeleton */}
          <aside className="w-full md:w-64 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-6 shrink-0">
            <div className="space-y-4">
              <div className="h-3 bg-slate-200 rounded w-32 px-3" />
              <div className="space-y-2">
                <div className="h-10 bg-slate-200 rounded-xl w-full" />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="h-3 bg-slate-200 rounded w-40 px-3" />
              <div className="space-y-2">
                <div className="h-10 bg-slate-200 rounded-xl w-full" />
                <div className="h-10 bg-slate-200 rounded-xl w-full" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="h-10 bg-slate-200 rounded-xl w-full" />
            </div>
          </aside>

          {/* Right Main Content Workspace Skeleton */}
          <main className="flex-1 w-full min-w-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Workspace Header Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-8 bg-slate-200 rounded-lg w-48" />
                  <div className="h-4 bg-slate-200 rounded w-64" />
                </div>
                <div className="h-10 bg-slate-200 rounded-xl w-36 shrink-0" />
              </div>

              {/* Metrics Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-slate-100">
                <div className="h-16 bg-slate-100 rounded-xl" />
                <div className="h-16 bg-slate-100 rounded-xl" />
                <div className="h-16 bg-slate-100 rounded-xl" />
              </div>

              {/* Content List Skeleton */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="h-5 bg-slate-200 rounded w-56" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-8 bg-slate-100 rounded-lg" />
                  <div className="h-8 bg-slate-100 rounded-lg" />
                  <div className="h-8 bg-slate-100 rounded-lg" />
                  <div className="h-8 bg-slate-100 rounded-lg" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
