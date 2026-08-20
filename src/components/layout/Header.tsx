"use client";

import { useState, useEffect } from "react";
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
} from "@heroicons/react/24/outline";

export const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navLinks = [
    { name: "Trang chủ", href: "/", icon: HomeIcon },
    { name: "Bài viết", href: "/blogs", icon: DocumentTextIcon },
  ];

  const [activeKey, setActiveKey] = useState<string>("/");

  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setActiveKey(href);
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
      icon: <Icon className="w-5 h-5 text-blue-600" />,
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
      key: "logout",
      label: "Đăng xuất",
      icon: <ArrowRightStartOnRectangleIcon className="w-4 h-4" />,
      danger: true,
      onClick: () => setIsLoggedIn(false),
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: EduSpace Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              Edu<span className="text-blue-600">Space</span>
            </span>
          </Link>

          {/* Center: Nav links using Antd Menu */}
          <nav className="hidden md:flex items-center">
            <Menu
              mode="horizontal"
              selectedKeys={[activeKey]}
              items={desktopMenuItems}
              theme="light"
              className="border-none !bg-transparent min-w-[420px] font-medium"
              disabledOverflow
            />
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
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
                  icon={<UserIcon className="w-5 h-5 text-slate-700" />}
                  className="cursor-pointer bg-slate-100 hover:bg-slate-200 hover:scale-105 transition-transform flex items-center justify-center border-none"
                />
              </Dropdown>
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
            <span className="text-lg font-bold text-slate-900">
              Edu<span className="text-blue-600">Space</span>
            </span>
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
