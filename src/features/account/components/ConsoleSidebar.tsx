
import {
  UserIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/features/auth';

interface ConsoleSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export function ConsoleSidebar({ activeTab, onSelectTab }: ConsoleSidebarProps) {
  const { user, logout } = useAuthStore();

  const navigationGroup = [
    {
      groupTitle: 'TÀI KHOẢN CÁ NHÂN',
      items: [
        {
          key: 'profile',
          label: 'Hồ sơ cá nhân',
          icon: UserIcon,
        },
      ],

    },
    {
      groupTitle: 'DỊCH VỤ & THANH TOÁN',
      items: [
        {
          key: 'subscription',
          label: 'Gói dịch vụ của tôi',
          icon: SparklesIcon,
        },
        {
          key: 'transactions',
          label: 'Hóa đơn',
          icon: CurrencyDollarIcon,
        },
      ],
    },

  ];

  return (
    <aside className="w-full md:w-64 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* User Card Header in Sidebar */}
        <div className="flex items-center gap-3 p-3 bg-white border border-slate-200/90 rounded-xl">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user?.name || 'Avatar'}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center font-bold text-base shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {user?.name || user?.email}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-5">
          {navigationGroup.map((group) => (
            <div key={group.groupTitle} className="space-y-1.5">
              <h3 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {group.groupTitle}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => onSelectTab(item.key)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                        ? 'bg-sky-600 text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'
                            }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Action Footer */}
      <div className="pt-4 border-t border-slate-200 mt-6">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-rose-500 shrink-0" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

