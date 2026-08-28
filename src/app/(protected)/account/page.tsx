'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth';
import {
  useMySubscriptions,
  ConsoleSidebar,
  ConsoleHeader,
  SubscriptionView,
  ProfileView,
  TransactionHistoryView,
} from '@/features/account';

import { Spin } from 'antd';

function AccountConsoleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const isLoggedIn = Boolean(user);

  const tabParam = searchParams.get('tab');
  const validTab = tabParam === 'security' ? 'profile' : tabParam;
  const initialTab =
    validTab && ['subscription', 'profile', 'transactions'].includes(validTab)
      ? validTab
      : 'subscription';

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Fetch subscription status using custom React Query hook
  const { data: subData, isLoading: isLoadingSub } = useMySubscriptions(isLoggedIn);
  const activeSub = subData?.activeSubscription || null;

  // Sync state with URL query parameter
  useEffect(() => {
    const currentTab = tabParam === 'security' ? 'profile' : tabParam;
    if (currentTab && ['subscription', 'profile', 'transactions'].includes(currentTab)) {
      setActiveTab(currentTab);
    }
  }, [tabParam]);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    router.push(`/account?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-slate-100/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Console Header */}
        <ConsoleHeader activeTab={activeTab} />

        {/* Console Main Body Grid */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left Sidebar */}
          <ConsoleSidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

          {/* Right Main Content Workspace */}
          <main className="flex-1 w-full min-w-0">
            {activeTab === 'subscription' && (
              <SubscriptionView activeSubscription={activeSub} isLoading={isLoadingSub} />
            )}
            {activeTab === 'profile' && (
              <ProfileView activeSubscription={activeSub} onNavigateTab={handleSelectTab} />
            )}
            {activeTab === 'transactions' && <TransactionHistoryView />}
          </main>
        </div>
      </div>
    </div>
  );

}

export default function AccountConsolePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <AccountConsoleContent />
    </Suspense>
  );
}

