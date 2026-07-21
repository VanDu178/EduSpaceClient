"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button, Drawer, Dropdown, Menu, type MenuProps } from "antd";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  BookOpenIcon,
  VideoCameraIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts";

export const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navLinks = [
    { name: "Trang chủ", href: "/#hero", icon: HomeIcon },
    { name: "Bài viết", href: "/#posts", icon: BookOpenIcon },
    { name: "Video", href: "/#videos", icon: VideoCameraIcon },
    { name: "Tài nguyên", href: "/#resources", icon: BriefcaseIcon },
    { name: "Khóa học", href: "/#courses", icon: AcademicCapIcon },
    { name: "Dịch vụ", href: "/#services", icon: WrenchScrewdriverIcon },
  ];

  const slowSmoothScrollTo = (targetPosition: number, duration: number = 1200) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.replace("/#", "");
      if (sectionId === "hero") {
        slowSmoothScrollTo(0, 1000);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          slowSmoothScrollTo(offsetPosition, 1200);
        }
      }
    }
  };

  const desktopMenuItems: MenuProps["items"] = navLinks?.map((link) => ({
    key: link?.href,
    label: (
      <Link href={link?.href} onClick={(e) => handleNavClick(e, link?.href)}>
        {link?.name}
      </Link>
    ),
  }));

  const mobileMenuItems: MenuProps["items"] = navLinks?.map((link) => {
    const Icon = link?.icon;
    return {
      key: link?.href,
      icon: <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      label: (
        <Link
          href={link?.href}
          onClick={(e) => {
            setMobileMenuOpen(false);
            handleNavClick(e, link?.href);
          }}
          className="text-sm font-medium"
        >
          {link?.name}
        </Link>
      ),
    };
  });

  const userMenuItems: MenuProps["items"] = [
    {
      key: "console",
      label: <Link href="/console">Console cá nhân</Link>,
      icon: <Squares2X2Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    },
    {
      key: "profile",
      label: <Link href="/profile">Trang cá nhân</Link>,
      icon: <UserIcon className="w-4 h-4" />,
    },
    {
      key: "my-courses",
      label: <Link href="/my-courses">Khóa học của tôi</Link>,
      icon: <AcademicCapIcon className="w-4 h-4" />,
    },
    {
      key: "settings",
      label: <Link href="/settings">Cài đặt tài khoản</Link>,
      icon: <Cog6ToothIcon className="w-4 h-4" />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <ArrowRightStartOnRectangleIcon className="w-4 h-4" />,
      danger: true,
      onClick: () => setIsLoggedIn(false),
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-[#131315]/80 border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: EduSpace Logo using Antd Avatar */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              Edu<span className="gradient-text">Space</span>
            </span>
          </Link>

          {/* Center: Nav links using Antd Menu */}
          <nav className="hidden md:flex items-center">
            <Menu
              mode="horizontal"
              selectedKeys={[pathname]}
              items={desktopMenuItems}
              theme={theme === "dark" ? "dark" : "light"}
              className="border-none !bg-transparent min-w-[420px] font-medium"
              disabledOverflow
            />
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark/Light mode toggle with Antd Tooltip + Button */}

            <Button
              type="text"
              shape="circle"
              onClick={toggleTheme}
              icon={
                theme === "dark" ? (
                  <SunIcon className="w-5 h-5 text-amber-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-indigo-600" />
                )
              }
              className="flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 border-none"
            />


            {/* Sign In Button / User Profile Menu */}
            {!isLoggedIn ? (
              <Link href="/login" className="hidden sm:inline-block">
                <Button
                  type="primary"
                  className="font-medium !rounded-lg h-10 px-5 flex items-center gap-1.5 border-none"
                >
                  <span>Đăng nhập</span>
                </Button>
              </Link>
            ) : (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
                <Avatar
                  size={36}
                  icon={<UserIcon className="w-5 h-5 text-slate-700 dark:text-zinc-200" />}
                  className="cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 hover:scale-105 transition-transform flex items-center justify-center border-none"
                />
              </Dropdown>
            )}

            {/* Hamburger menu button for Mobile using Antd Button */}
            <Button
              type="text"
              shape="circle"
              onClick={() => setMobileMenuOpen(true)}
              icon={<Bars3Icon className="w-6 h-6 text-slate-600 dark:text-zinc-400" />}
              className="md:!hidden flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 border-none"
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation using Antd Drawer + Menu */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Edu<span className="gradient-text">Space</span>
            </span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<XMarkIcon className="w-5 h-5 text-slate-500 dark:text-zinc-400" />}
        styles={{
          header: {
            background: theme === "dark" ? "#131315" : "#ffffff",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            color: theme === "dark" ? "#fff" : "#0f172a",
          },
          body: {
            background: theme === "dark" ? "#131315" : "#ffffff",
            padding: "16px 8px",
          },
        }}
      >
        <div className="flex flex-col h-full justify-between">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={mobileMenuItems}
            theme={theme === "dark" ? "dark" : "light"}
            className="border-none bg-transparent"
          />
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 px-4 mb-4">
            {!isLoggedIn ? (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center"
              >
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<ArrowRightStartOnRectangleIcon className="w-5 h-5" />}
                  className="!rounded-lg font-medium flex items-center justify-center gap-2 border-none h-12 text-base"
                >
                  Đăng nhập
                </Button>
              </Link>
            ) : (
              <Button
                type="default"
                danger
                block
                size="large"
                icon={<ArrowRightStartOnRectangleIcon className="w-5 h-5" />}
                onClick={() => {
                  setIsLoggedIn(false);
                  setMobileMenuOpen(false);
                }}
                className="rounded-xl font-medium flex items-center justify-center gap-2 h-12 text-base"
              >
                Đăng xuất
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
