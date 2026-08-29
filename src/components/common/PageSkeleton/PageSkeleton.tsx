export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100/60 py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Breadcrumb & Title Placeholder */}
        <div className="pb-4 border-b border-slate-200/80 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-48" />
          <div className="h-8 bg-slate-200 rounded-lg w-64" />
        </div>

        {/* Hero / Main Card Workspace Placeholder */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-7 bg-slate-200 rounded-lg w-56" />
              <div className="h-4 bg-slate-200 rounded w-72" />
            </div>
            <div className="h-10 bg-slate-200 rounded-xl w-32 shrink-0" />
          </div>

          {/* Grid Cards Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="h-28 bg-slate-100 rounded-xl" />
            <div className="h-28 bg-slate-100 rounded-xl" />
            <div className="h-28 bg-slate-100 rounded-xl" />
          </div>

          {/* Content Rows Placeholder */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="h-5 bg-slate-200 rounded w-44" />
            <div className="h-12 bg-slate-100 rounded-xl" />
            <div className="h-12 bg-slate-100 rounded-xl" />
            <div className="h-12 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
