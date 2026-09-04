"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button, Drawer, Dropdown, Menu, type MenuProps } from "antd";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
  HomeIcon,
  DocumentTextIcon,
  SparklesIcon,
  KeyIcon,
  TicketIcon,
  VideoCameraIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/features/auth";
import { APP_ROUTES } from "@/core/config/routes";
import { NotificationBell } from "@/components/common/NotificationBell";

export const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isInitialized, logout } = useAuthStore();
  const isLoggedIn = Boolean(user);

  const loginHref =
    pathname && pathname !== APP_ROUTES.HOME && pathname !== APP_ROUTES.LOGIN && pathname !== APP_ROUTES.REGISTER
      ? `${APP_ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname)}`
      : APP_ROUTES.LOGIN;

  const isPaidUser = Boolean(user?.isPremium || (user?.plan && user.plan.toUpperCase() !== "FREE"));
  const userPlanName =
    user?.planName;

  const navLinks = [
    { name: "Trang chủ", href: APP_ROUTES.HOME, icon: HomeIcon },
    { name: "Bài viết", href: APP_ROUTES.BLOGS, icon: DocumentTextIcon },
    { name: "Video", href: APP_ROUTES.VIDEOS, icon: VideoCameraIcon },
    { name: "Công cụ", href: APP_ROUTES.TOOLS, icon: WrenchScrewdriverIcon },
  ];

  const activeKey =
    navLinks.find((link) => link.href === APP_ROUTES.HOME ? pathname === APP_ROUTES.HOME : pathname.startsWith(link.href))?.href || APP_ROUTES.HOME;

  const desktopMenuItems: MenuProps["items"] = navLinks.map((link) => ({
    key: link.href,
    label: (
      <Link href={link.href} className="font-medium text-sm">
        {link.name}
      </Link>
    ),
  }));

  const mobileMenuItems: MenuProps["items"] = navLinks.map((link) => {
    const Icon = link.icon;
    return {
      key: link.href,
      icon: <Icon className="w-5 h-5 text-sky-600" />,
      label: (
        <Link
          href={link.href}
          onClick={() => setMobileMenuOpen(false)}
          className="text-sm font-medium"
        >
          {link.name}
        </Link>
      ),
    };
  });

  const userMenuItems: MenuProps["items"] = [
    {
      key: "account-settings",
      label: <Link href="/account?tab=profile">Quản lý tài khoản</Link>,
      icon: <UserIcon className="w-4 h-4 text-slate-600" />,
    },
    {
      key: "subscription-tab",
      label: <Link href={`${APP_ROUTES.ACCOUNT}?tab=subscription`}>Gói dịch vụ của tôi</Link>,
      icon: <SparklesIcon className="w-4 h-4 text-sky-600" />,
    },
    {
      key: "support-center",
      label: <Link href={`${APP_ROUTES.ACCOUNT}?tab=support`}>Trung tâm hỗ trợ</Link>,
      icon: <TicketIcon className="w-4 h-4 text-amber-600" />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <ArrowRightStartOnRectangleIcon className="w-4 h-4" />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: TradeVerse Logo */}
          <Link href={APP_ROUTES.HOME} className="flex items-center gap-2.5 group">
            <img src="/images/logo.png" alt="TradeVerse Logo" className="h-8 sm:h-9 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              Trade<span className="text-sky-500">Verse</span>
            </span>
          </Link>

          {/* Center: Nav links using Antd Menu */}
          <nav className="hidden md:flex items-center">
            <Menu
              mode="horizontal"
              selectedKeys={[activeKey]}
              items={desktopMenuItems}
              theme="light"
              className="border-none !bg-transparent min-w-[360px] font-medium"
              disabledOverflow
            />
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sign In Button / User Profile Menu */}
            {!isInitialized ? (
              <div className="w-20 h-10 bg-slate-100/80 rounded-xl animate-pulse" />
            ) : !isLoggedIn ? (
              <Link href={loginHref}>
                <Button
                  type="primary"
                  className="font-medium !rounded-lg h-10 px-5 flex items-center gap-1.5 border-none bg-sky-600 hover:!bg-sky-500"
                >
                  <span>Đăng nhập</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2.5">
                {/* Nút nâng cấp nếu chưa phải gói trả phí */}
                {!isPaidUser && (
                  <Link href={APP_ROUTES.PRICING} className="hidden sm:block">
                    <Button
                      type="primary"
                      size="small"
                      className="!rounded-full font-medium h-8 px-3 text-xs flex items-center gap-1.5 border-none bg-sky-600 hover:!bg-sky-500"
                      icon={<SparklesIcon className="w-3.5 h-3.5 text-amber-300" />}
                    >
                      Nâng cấp
                    </Button>
                  </Link>
                )}

                {/* Icon Quả chuông thông báo tập trung */}
                <NotificationBell />

                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
                  <div className="group flex items-center gap-2.5 py-1 px-1 sm:px-1.5 cursor-pointer transition-all select-none">
                    <Avatar
                      size={36}
                      icon={<UserIcon className="w-5 h-5 text-sky-600" />}
                      className="!bg-sky-50 border border-sky-200 group-hover:border-sky-400 group-hover:ring-2 group-hover:ring-sky-400/30 group-hover:scale-105 transition-all duration-200 flex items-center justify-center shrink-0"
                    />
                    <div className="hidden sm:flex flex-col text-left justify-center min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors truncate max-w-[140px] sm:max-w-[180px] leading-snug">
                        {user?.name || user?.email || "Người dùng"}
                      </span>
                      <div className="flex items-center gap-1 leading-none mt-0.5">
                        {isPaidUser ? (
                          <span className="text-[11px] font-medium text-sky-600 flex items-center gap-0.5">
                            <SparklesIcon className="w-3 h-3 text-sky-500 inline shrink-0" />
                            {userPlanName}
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-500">
                            {userPlanName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            )}

            {/* Hamburger menu button for Mobile using Antd Button */}
            <Button
              type="text"
              shape="circle"
              onClick={() => setMobileMenuOpen(true)}
              icon={<Bars3Icon className="w-6 h-6 text-slate-600" />}
              className="md:!hidden flex items-center justify-center hover:bg-slate-100 border-none"
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation using Antd Drawer + Menu */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="TradeVerse Logo" className="h-7 w-auto object-contain" />
              <span className="text-lg font-bold text-slate-900">
                Trade<span className="text-sky-500">Verse</span>
              </span>
            </div>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<XMarkIcon className="w-5 h-5 text-slate-500" />}
        styles={{
          header: {
            background: "#ffffff",
            borderColor: "rgba(0,0,0,0.06)",
            color: "#0f172a",
          },
          body: {
            background: "#ffffff",
            padding: "16px 8px",
          },
        }}
      >
        <div className="flex flex-col h-full justify-between">
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            items={mobileMenuItems}
            theme="light"
            className="border-none bg-transparent"
          />
          <div className="pt-4 border-t border-slate-200 px-4 mb-4">
            {!isInitialized ? (
              <div className="w-full h-10 bg-slate-100/80 rounded-xl animate-pulse" />
            ) : !isLoggedIn ? (
              <Link
                href={loginHref}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center"
              >
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<ArrowRightStartOnRectangleIcon className="w-5 h-5" />}
                  className="!rounded-lg font-medium flex items-center justify-center gap-2 border-none h-12 text-base bg-sky-600 hover:!bg-sky-500"
                >
                  Đăng nhập
                </Button>
              </Link>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Avatar
                      size={36}
                      icon={<UserIcon className="w-5 h-5 text-sky-600" />}
                      className="bg-sky-100 border border-sky-200 flex items-center justify-center flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user?.name || user?.email || "Người dùng"}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${isPaidUser
                            ? "bg-sky-100 text-sky-700 border-sky-200 font-semibold flex items-center gap-1"
                            : "bg-white text-slate-600 border-slate-200"
                            }`}
                        >
                          {isPaidUser && <SparklesIcon className="w-3 h-3 text-sky-600" />}
                          {userPlanName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isPaidUser && (
                    <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        type="primary"
                        size="small"
                        className="!rounded-full font-medium h-8 px-3 text-xs flex items-center gap-1 border-none bg-sky-600 hover:!bg-sky-500 flex-shrink-0"
                        icon={<SparklesIcon className="w-3.5 h-3.5 text-amber-300" />}
                      >
                        Nâng cấp
                      </Button>
                    </Link>
                  )}
                </div>

                <Link
                  href="/change-password"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block"
                >
                  <Button
                    type="default"
                    block
                    size="large"
                    icon={<KeyIcon className="w-5 h-5 text-slate-600" />}
                    className="rounded-xl font-medium flex items-center justify-center gap-2 h-12 text-base border-slate-200 text-slate-700 hover:text-sky-600"
                  >
                    Đổi mật khẩu
                  </Button>
                </Link>
                <Button
                  type="default"
                  danger
                  block
                  size="large"
                  icon={<ArrowRightStartOnRectangleIcon className="w-5 h-5" />}
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-xl font-medium flex items-center justify-center gap-2 h-12 text-base border-red-200 hover:border-red-300"
                >
                  Đăng xuất
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

